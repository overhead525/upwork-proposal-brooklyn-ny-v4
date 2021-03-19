import { MongoDataSource } from "apollo-datasource-mongodb";
import { FormDoc, OptionalFormDoc } from "../../../models/types";

export class Forms extends MongoDataSource<FormDoc> {
  async getForms(formIDs: string[]) {
    const response = formIDs.map(async (id) => {
      return this.getForm(id);
    });
    return response;
  }

  async getForm(formID: string) {
    const response = await this.findOneById(formID, {
      ttl: 3600,
    });
    return response;
  }

  async createForm(form: FormDoc) {
    try {
      const response = await this.collection.insertOne(form);
      return response.ops[0];
    } catch (error) {
      return error;
    }
  }

  async deleteForm(formID: string) {
    try {
      const response = await this.collection.deleteOne({ id: formID });
      return response.deletedCount > 0;
    } catch (error) {
      return error;
    }
  }

  async updateForm(
    formID: string,
    alterationObject: OptionalFormDoc
  ): Promise<boolean> {
    try {
      let form = this.getForm(formID);
      form = { ...form, ...alterationObject };
      // @ts-ignore
      await form.save();
      return true;
    } catch (error) {
      return error;
    }
  }
}
