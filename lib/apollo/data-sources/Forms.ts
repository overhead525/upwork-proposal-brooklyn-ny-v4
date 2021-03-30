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
      const response = await this.collection.findOneAndDelete({
        id: args.formID,
      });
      return response.ok === 1;
    } catch (error) {
      return error;
    }
  }
}
