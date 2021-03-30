import { MongoDataSource } from "apollo-datasource-mongodb";
import {
  Maybe,
  MutationCreateFormElementArgs,
  QueryGetFormElementArgs,
  FormElement,
  MutationDeleteFormElementArgs,
  MutationUpdateFormElementArgs,
  Scalars,
} from "../../../src/generated/graphql";

export class FormElements extends MongoDataSource<FormElement> {
  async createFormElement(
    args: MutationCreateFormElementArgs
  ): Promise<Maybe<FormElement>> {
    const newFormElement: FormElement = {
      ...args,
    };
    try {
      const response = await this.collection.insertOne(newFormElement);
      return response.ops[0];
    } catch (error) {
      return error;
    }
  }

  async getFormElement(
    args: QueryGetFormElementArgs
  ): Promise<Maybe<FormElement>> {
    try {
      const response = await this.findOneById(args.formElementID);
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateFormElement(
    args: MutationUpdateFormElementArgs
  ): Promise<Maybe<FormElement>> {
    try {
      const formElement = await this.findOneById(args.formElementID);
      const { formElementID, ...changes } = args;
      const newFormElement = {
        ...formElement,
        ...changes,
      };
      const response = await this.collection.findOneAndUpdate(
        { id: formElementID },
        newFormElement
      );
      return response.value;
    } catch (error) {
      return error;
    }
  }

  async deleteFormElement(
    args: MutationDeleteFormElementArgs
  ): Promise<Scalars["Boolean"]> {
    try {
      const response = await this.collection.findOneAndDelete({
        id: args.formElementID,
      });
      return response.ok === 1;
    } catch (error) {
      return error;
    }
  }
}
