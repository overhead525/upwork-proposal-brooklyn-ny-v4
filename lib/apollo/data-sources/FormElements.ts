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
    const { username, ...newFormElement } = { ...args };
    const newFormElement2 = { ...newFormElement };
    try {
      const existing = await this.collection.findOne({
        questionKey: args.questionKey,
      });
      if (existing)
        throw new Error(
          `formElement with questionKey '${args.questionKey}' already exists`
        );

      const response = await this.collection.insertMany([
        newFormElement,
        newFormElement2,
      ]);
      const [previewID, publishedID] = [...Object.values(response.insertedIds)];

      await this.collection.findOneAndUpdate(
        { _id: previewID },
        {
          $set: { draftOf: publishedID.toHexString() },
        }
      );
      await this.collection.findOneAndUpdate(
        { _id: publishedID },
        {
          $set: { draftOf: previewID.toHexString() },
        }
      );

      const response2 = await this.collection.findOne({
        _id: previewID,
      });
      if (response2) return response2;
      throw new Error("There was an error creating your formElement");
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
