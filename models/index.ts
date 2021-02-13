import { formSchema, userSchema } from "./schema";
import { model } from "mongoose";

export const Form = model("Form", formSchema, "forms");

export const User = model("User", userSchema, "users");
