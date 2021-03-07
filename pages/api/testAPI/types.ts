import { FormDoc, FormElementDoc, UserDoc } from "../../../models/types";

export interface StoredFormElement extends FormElementDoc, Document {}
export interface StoredForm extends FormDoc, Document {}
