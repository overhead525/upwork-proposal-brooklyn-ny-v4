import { Schema } from "mongoose";

import { choiceFormElementTypes, formElementType } from "./interfaces";

export const formElementSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
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
  draftOf: {
    type: String,
    required: function () {
      return !this.displayFor;
    },
  },
  displayFor: {
    type: String,
    required: function () {
      return !this.draftOf;
    },
  },
});

export const formObjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  pages: {
    type: [[String]],
    required: true,
  },
});

export const formSchema = new Schema({
  preview: {
    type: formObjectSchema,
    required: true,
  },
  published: {
    type: formObjectSchema,
    required: true,
  },
});

export const mediaElementDataTuple = new Schema({
  canononicalName: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

export const mediaElementSchema = new Schema({
  mediaType: {
    type: String,
    required: true,
  },
  data: {
    type: [mediaElementDataTuple],
    required: true,
  },
});

export const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  forms: {
    type: [String],
    required: true,
  },
  media: {
    type: [mediaElementSchema],
    required: true,
  },
});
