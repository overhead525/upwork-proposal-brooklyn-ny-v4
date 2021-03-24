import { MongoDataSource } from "apollo-datasource-mongodb";
import {
  Maybe,
  MutationCreateUserArgs,
  MutationDeleteUserArgs,
  MutationUpdateUserArgs,
  QueryGetUserArgs,
  User,
} from "../../../src/generated/graphql";

interface Context {
  loggedInUser: User;
}

export class Users extends MongoDataSource<User, Context> {
  async createUser(args: MutationCreateUserArgs): Maybe<User> {}

  async getUser(args: QueryGetUserArgs): Maybe<User> {}

  async updateUser(args: MutationUpdateUserArgs): Maybe<User> {}

  async deleteUser(args: MutationDeleteUserArgs): Maybe<User> {}
}
