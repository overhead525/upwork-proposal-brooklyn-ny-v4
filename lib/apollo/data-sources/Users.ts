import { MongoDataSource } from "apollo-datasource-mongodb";
import {
  MediaElementType,
  OptionalUserDoc,
  UserDoc,
} from "../../../models/types";
import { ObjectID } from "mongodb";
import { Document } from "mongoose";

interface Context {
  loggedInUser: UserDoc;
}

export class Users extends MongoDataSource<UserDoc, Context> {}
