import { MongoDataSource } from "apollo-datasource-mongodb";
import { formElementType } from "../../../models/interfaces";
import { FormElementDoc } from "../../../models/types";

export class FormElements extends MongoDataSource<FormElementDoc> {
  async getFormElement(formElementID: string) {
    const response = await this.findOneById(formElementID, { ttl: 3600 });
    // @ts-ignore
    response.type = formElementType[Number.parseInt(response.type)];
    return response;
  }
}
