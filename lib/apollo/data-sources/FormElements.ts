import { MongoDataSource } from "apollo-datasource-mongodb";
import { formElementType } from "../../../models/interfaces";
import { FormElementDoc } from "../../../models/types";

export class FormElements extends MongoDataSource<FormElementDoc> {
  async getFormElements(formElementIDs: string[]) {
    return formElementIDs.map(async (id) => {
      await this.getFormElement(id);
    });
  }

  async getFormElement(formElementID: string) {
    const response = await this.findOneById(formElementID, { ttl: 3600 });
    // @ts-ignore
    response.type = formElementType[Number.parseInt(response.type)];
    return response;
  }

  async createFormElement(formElement: FormElementDoc) {
    try {
      const response = await this.collection.insertOne(formElement);
      return response.ops[0];
    } catch (error) {
      return error;
    }
  }

  async deleteFormElement(formElementID: string) {
    try {
      const response = await this.collection.deleteOne({ id: formElementID });
      return response.deletedCount > 0;
    } catch (error) {
      return error;
    }
  }
}
