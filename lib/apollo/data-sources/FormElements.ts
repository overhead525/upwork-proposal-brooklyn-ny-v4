import { MongoDataSource } from "apollo-datasource-mongodb";
import {
  Maybe,
  QueryGetFormElementArgs,
  FormElement,
  MutationDeleteFormElementArgs,
  MutationUpdateFormElementArgs,
  Scalars,
  MutationCreatePreviewFormElementArgs,
  MutationCreatePublishedFormElementArgs,
} from "../../../src/generated/graphql";
import { ObjectID } from "mongodb";

export class FormElements extends MongoDataSource<FormElement> {
  async createPreviewFormElement(
    args: MutationCreatePreviewFormElementArgs
  ): Promise<{ formElement: Maybe<FormElement>; previewID: string }> {
    try {
      const existing = await this.collection.findOne({
        questionKey: args.questionKey,
      });
      if (existing)
        throw new Error(
          `formElement with questionKey '${args.questionKey}' already exists`
        );

      const { formID, ...newFormElement } = { ...args };

      const response = await this.collection.insertOne(newFormElement);
      const previewID = response.insertedId;

      const response2 = await this.collection.findOne({
        _id: previewID,
      });
      if (response2)
        return {
          formElement: response2,
          previewID: previewID.toHexString(),
        };
      throw new Error("There was an error creating your formElement");
    } catch (error) {
      return error;
    }
  }

  async createPublishedFormElement(
    args: MutationCreatePublishedFormElementArgs
  ): Promise<{ formElement: Maybe<FormElement>; publishedID: string }> {
    try {
      if (!args.displayFor)
        throw new Error(
          `Published formElements can only be created if displaying for an existing preview formElement`
        );

      const previewElement = await this.findOneById(args.displayFor);
      if (!previewElement)
        throw new Error(
          `displayFor argument ERROR -> preview formElement with id: "${args.displayFor}" not found`
        );

      const existing = await this.collection.findOne({
        questionKey: args.questionKey,
      });
      if (existing)
        throw new Error(
          `formElement with questionKey '${args.questionKey}' already exists`
        );

      const { formID, ...newFormElement } = { ...args };

      const publishedResponse = await this.collection.insertOne(newFormElement);
      const publishedID = publishedResponse.insertedId;

      await this.collection.findOneAndUpdate(
        { _id: new ObjectID(args.displayFor) },
        {
          $set: { draftOf: publishedID.toHexString() },
        }
      );

      const response2 = await this.collection.findOne({
        _id: publishedID,
      });
      if (response2)
        return {
          formElement: response2,
          publishedID: publishedID.toHexString(),
        };
      throw new Error("There was an error creating your formElement");
    } catch (error) {
      return error;
    }
  }

  async getFormElement(
    args: QueryGetFormElementArgs
  ): Promise<Maybe<FormElement>> {
    try {
      const response = await this.collection.findOne({
        _id: new ObjectID(args.formElementID),
      });
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
