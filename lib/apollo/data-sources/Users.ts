import { MongoDataSource } from "apollo-datasource-mongodb";
import { MediaElementType, UserDoc } from "../../../models/types";
import { ObjectID } from "mongodb";
import { User } from "../../../models";

interface Context {
  loggedInUser: UserDoc;
}

export class Users extends MongoDataSource<any, Context> {
  async getUser(userID: ObjectID): Promise<UserDoc> {
    const response: UserDoc = await this.findOneById(userID, { ttl: 3600 });
    return response;
  }

  async getUserFormsAll(userID: ObjectID): Promise<string[]> {
    const userFormIDs = await (await this.findOneById(userID)).forms;
    return userFormIDs;
  }

  async getUserMediaAll(userID: ObjectID): Promise<MediaElementType[]> {
    const userMedia = await (await this.findOneById(userID)).media;
    return userMedia;
  }

  async createUser(username: string): Promise<boolean> {
    // Make sure to check if there is another user with that same username
    // We do NOT want duplicate usernames
    const newUserDoc: UserDoc = {
      forms: [],
      media: [],
    };
    const newUser = new User(newUserDoc);
  }

  async deleteUser(username: string) {}
}
