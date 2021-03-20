import { MongoDataSource } from "apollo-datasource-mongodb";
import { formElementType } from "../../../models/interfaces";
import { FormElementDoc, OptionalFormElementDoc } from "../../../models/types";

export class FormElements extends MongoDataSource<FormElementDoc> {}
