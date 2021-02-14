import { Document } from "mongoose";

import { formElementType } from "./interfaces";

export type FormElementDoc = Document & {
  question: string;
  type: formElementType;
  questionKey: string;
  helperText?: string;
  choices?: [string];
};

export type FormObjectDoc = Document & {
  title: string;
  pages: [[FormElementDoc]];
  url: string;
};

export type FormDoc = Document & {
  preview: FormObjectDoc;
  published: FormObjectDoc;
};

export type MediaElementType = Document & {
  mediaType: string;
  [canononicalName: string]: string;
};

export type UserDoc = Document & {
  forms: string[];
  media: MediaElementType[];
};
