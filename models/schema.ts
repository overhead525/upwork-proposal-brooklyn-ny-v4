import { Schema } from "mongoose";

import { choiceFormElementTypes, formElementType } from "./interfaces";

export const formElementSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(formElementType),
    required: true,
  },
  questionKey: {
    type: String,
    required: true,
  },
  helperText: {
    type: String,
    required: false,
  },
  choices: {
    type: [String],
    required: function () {
      return this.type in choiceFormElementTypes;
    },
  },
});

export const formObjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  pages: {
    type: [[formElementSchema]],
    required: true,
  },
});

export const formSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  preview: {
    type: formObjectSchema,
    required: true,
  },
  published: {
    type: formObjectSchema,
    required: true,
  },
});

export const mediaElementSchema = new Schema({
  mediaType: {
    type: String,
    required: true,
  },
  data: {
    type: Map,
    of: String,
    required: true,
  },
});

export const userSchema = new Schema({
  forms: {
    type: [String],
    required: true,
  },
  media: {
    type: [mediaElementSchema],
    required: true,
  },
});
