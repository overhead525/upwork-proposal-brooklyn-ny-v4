import {
  formSchema,
  formElementSchema,
  formObjectSchema,
  mediaElementSchema,
  userSchema,
  mediaElementDataTuple,
} from "../models/schema";
import { model } from "mongoose";

export const Form = model("Form", formSchema, "forms");

export const FormElement = model(
  "FormElement",
  formElementSchema,
  "formElements"
);

export const FormObject = model("FormObject", formObjectSchema);

export const MediaElementDataTuple = model(
  "MediaElementDataTuple",
  mediaElementDataTuple
);

export const MediaElement = model("MediaElement", mediaElementSchema);

export const User = model("User", userSchema, "users");
