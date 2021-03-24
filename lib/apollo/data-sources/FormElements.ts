import { MongoDataSource } from "apollo-datasource-mongodb";
import { FormElementDoc } from "../../../models/types";
import {
  Maybe,
  MutationCreateFormElementArgs,
  QueryGetFormElementArgs,
  FormElement,
  MutationDeleteFormElementArgs,
  MutationUpdateFormElementArgs,
  Scalars,
} from "../../../src/generated/graphql";

export class FormElements extends MongoDataSource<FormElementDoc> {
  async createFormElement(
    args: MutationCreateFormElementArgs
  ): Maybe<FormElement> {}

  async getFormElement(args: QueryGetFormElementArgs): Maybe<FormElement> {}

  async updateFormElement(
    args: MutationUpdateFormElementArgs
  ): Maybe<FormElement> {}

  async deleteFormElement(
    args: MutationDeleteFormElementArgs
  ): Scalars["Boolean"];
}
