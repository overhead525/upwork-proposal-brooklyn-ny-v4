import { MongoDataSource } from "apollo-datasource-mongodb";
import { MediaElementType, UserDoc } from "../../../models/types";
import { ObjectID } from "mongodb";
import { Document } from "mongoose";

interface Context {
  loggedInUser: UserDoc;
}

interface ExtendedUserDoc extends Document, UserDoc {}

export class Users extends MongoDataSource<UserDoc, Context> {
  async getUser(userID: string) {
    const response = await this.findOneById(userID, {
      ttl: 3600,
    });
    return response;
  }

  async getUserFormsAll(userID: string): Promise<string[]> {
    const userFormIDs = await this.getUser(userID);
    return userFormIDs.forms;
  }

  async getUserMediaAll(userID: string): Promise<MediaElementType[]> {
    const userMedia = await this.getUser(userID);
    return userMedia.media;
  }

  async createUser(username: string): Promise<boolean> {
    // Make sure to check if there is another user with that same username
    // We do NOT want duplicate usernames
    const newUserDoc: UserDoc = {
      username,
      forms: [],
      media: [],
    };

    try {
      await this.collection.insertOne(newUserDoc);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteUser(userID: ObjectID): Promise<boolean> {
    try {
      this.collection.deleteOne({ id: userID.toHexString() }, null, (err) => {
        if (err) throw err;
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export const UserResolvers = {
  Query: {
    getUser: async (_source, { userID }, { dataSources: { users } }) =>
      await users.getUser(userID),
    getUserFormsAll: async (_source, { userID }, { dataSources: { users } }) =>
      await users.getUserFormsAll(userID),
    getUserMediaAll: async (_source, { userID }, { dataSources: { users } }) =>
      await users.getUserMediaAll(userID),
  },
  Mutation: {
    createUser: async (username, _, { dataSources: { users } }) =>
      await users.createUser(username),
    deleteUser: async (userID, _, { dataSources: { users } }) =>
      await users.deleteUser(userID),
  },
};
