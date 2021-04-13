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
import { ObjectID } from "mongodb";

export class Forms extends MongoDataSource<Form> {
  async createForm(args: MutationCreateFormArgs): Promise<Maybe<Form>> {
    const newForm: Form = {
      preview: {
        title: args.previewTitle,
        pages: args.previewPages,
      },
      published: {
        title: args.publishedTitle,
        pages: args.publishedPages,
      },
    };

    try {
      const response = await this.collection.insertOne(newForm);
      return response.ops[0];
    } catch (error) {
      return error;
    }
  }

  async getForm(args: QueryGetFormArgs): Promise<Maybe<Form>> {
    try {
      const response = await this.findOneById(args.formID);
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateForm(args: MutationUpdateFormArgs): Promise<Maybe<Form>> {
    try {
      const form = await this.findOneById(args.formID);
      const { formID, ...changes } = args;
      const newForm = {
        ...form,
        ...changes,
      };
      const response = await this.collection.findOneAndUpdate(
        { id: formID },
        newForm
      );
      return response.value;
    } catch (error) {
      return error;
    }
  }

  async deleteForm(args: MutationDeleteFormArgs): Promise<Scalars["Boolean"]> {
    try {
      await this.collection.findOneAndDelete({
        _id: new ObjectID(args.formID),
      });

      const response2 = await this.collection.findOne({
        _id: new ObjectID(args.formID),
      });

      if (!response2) return true;
      throw Error(`form ${args.formID} was not deleted`);
    } catch (error) {
      return error;
    }
  }
}
