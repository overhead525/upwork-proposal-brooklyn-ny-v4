import { MongoDataSource } from "apollo-datasource-mongodb";
import { formElementType } from "../../../models/interfaces";
import { FormElementDoc, OptionalFormElementDoc } from "../../../models/types";

export class FormElements extends MongoDataSource<FormElementDoc> {
  async getFormElements(formElementIDs: string[]) {
    try {
      return formElementIDs.map(async (id) => {
        await this.getFormElement(id);
      });
    } catch (error) {
      return error;
    }
  }

  async getFormElement(formElementID: string) {
    try {
      const response = await this.findOneById(formElementID, { ttl: 3600 });
      // @ts-ignore
      response.type = formElementType[Number.parseInt(response.type)];
      return response;
    } catch (error) {
      return error;
    }
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

  async updateFormElement(
    formElementID: string,
    alterationObject: OptionalFormElementDoc
  ): Promise<Boolean> {
    try {
      let formElement = await this.getFormElement(formElementID);
      formElement = { ...formElement, ...alterationObject };
      // @ts-ignore
      await formElement.save();
      return true;
    } catch (error) {
      return error;
    }
  }
}
