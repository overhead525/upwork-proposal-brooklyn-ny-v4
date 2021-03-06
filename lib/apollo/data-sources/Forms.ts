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
  async createForm(
    args: MutationCreateFormArgs
  ): Promise<Maybe<{ id: string; form: Form }>> {
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
      return {
        id: response.insertedId.toHexString(),
        form: await this.collection.findOne({ _id: response.insertedId }),
      };
    } catch (error) {
      return error;
    }
  }

  async getForm(args: QueryGetFormArgs): Promise<Maybe<Form>> {
    try {
      const response = await this.collection.findOne({
        _id: new ObjectID(args.formID),
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async getAllFormIDs(): Promise<Maybe<Array<Scalars["String"]>>> {
    try {
      const response = await this.collection.find({});
      const formsArr = await response.toArray();
      // @ts-ignore
      const result = formsArr.map((form) => form._id.toHexString());
      return result;
    } catch (error) {
      return error;
    }
  }

  async updateForm(args: MutationUpdateFormArgs): Promise<Maybe<Form>> {
    try {
      const form = await this.collection.findOne({
        _id: new ObjectID(args.formID),
      });
      const newForm = { ...form };
      const { formID, ...changes } = args;

      if (changes && changes.previewTitle)
        newForm.preview.title = changes.previewTitle;
      if (changes && changes.publishedTitle)
        newForm.published.title = changes.publishedTitle;
      if (changes && changes.previewPages)
        newForm.preview.pages = changes.previewPages;
      if (changes && changes.publishedPages)
        newForm.published.pages = changes.publishedPages;

      await this.collection.findOneAndUpdate(
        { _id: new ObjectID(formID) },
        { $set: { preview: newForm.preview, published: newForm.published } }
      );
      return await this.collection.findOne({ _id: new ObjectID(formID) });
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
