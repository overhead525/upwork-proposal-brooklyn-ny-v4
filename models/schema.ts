import { Mongoose, Schema } from "mongoose";

import { formElementType } from "./interfaces";

const formElementSchema = new Schema({
  question: String,
  type: Number,
  questionKey: String,
  helperText: String,
  choices: [String],
});

const formObjectSchema = new Schema({
  title: String,
  pages: [[formElementSchema]],
  url: String,
});

export const formSchema = new Schema({
  preview: formObjectSchema,
  published: formObjectSchema,
});

export const userSchema = new Schema({
  forms: [String],
  media: {
    type: Map,
    of: {
      type: Map,
      of: String,
    },
  },
});
