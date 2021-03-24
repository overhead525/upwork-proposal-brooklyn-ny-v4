import { MongoDataSource } from "apollo-datasource-mongodb";
import {
  Form,
  Maybe,
  Scalars,
  MutationCreateFormArgs,
  MutationDeleteFormArgs,
  MutationUpdateFormArgs,
  QueryGetFormArgs,
} from "../../../src/generated/graphql";

export class Forms extends MongoDataSource<Form> {
  async createForm(args: MutationCreateFormArgs): Maybe<Form> {}

  async getForm(args: QueryGetFormArgs): Maybe<Form> {}

  async updateForm(args: MutationUpdateFormArgs): Maybe<Form> {}

  async deleteForm(args: MutationDeleteFormArgs): Scalars["Boolean"] {}
}
