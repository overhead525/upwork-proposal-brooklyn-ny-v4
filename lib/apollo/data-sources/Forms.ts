import { MongoDataSource } from "apollo-datasource-mongodb";
import { FormDoc, OptionalFormDoc } from "../../../models/types";

export class Forms extends MongoDataSource<FormDoc> {}
