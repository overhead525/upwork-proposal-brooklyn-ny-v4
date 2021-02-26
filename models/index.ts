import {
  formSchema,
  formElementSchema,
  formObjectSchema,
  mediaElementSchema,
  userSchema,
} from "./schema";
import { model } from "mongoose";

export const Form = model("Form", formSchema, "forms");

export const FormElement = model(
  "FormElement",
  formElementSchema,
  "formElements"
);

export const FormObject = model("FormObject", formObjectSchema);

export const MediaElement = model("MediaElement", mediaElementSchema);

export const User = model("User", userSchema, "users");
