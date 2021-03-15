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

  async createUser(username: string) {
    // Make sure to check if there is another user with that same username
    // We do NOT want duplicate usernames
    const newUserDoc: UserDoc = {
      username,
      forms: [],
      media: [],
    };

    const existing = await this.collection.findOne({ username });
    if (existing) {
      return new Error("Could not create new user, username is already taken");
    } else {
      const result = await this.collection.insertOne(newUserDoc);
      return result.ops[0];
    }
  }

  async deleteUser(username: string) {
    try {
      const result = await this.collection.deleteOne({ username });
      return result.deletedCount > 0;
    } catch (error) {
      return error;
    }
  }
}
