import { MongoDataSource } from "apollo-datasource-mongodb";
import { FormDoc } from "../../../models/types";

export class Forms extends MongoDataSource<FormDoc> {
  async getForm(formID: string) {
    const response = await this.findOneById(formID, {
      ttl: 3600,
    });
    return response;
  }
}
