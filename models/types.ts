import { Document } from "mongoose";

import { formElementType } from "./interfaces";

export type FormElementDoc = {
  question: string;
  type: formElementType;
  questionKey: string;
  helperText?: string;
  choices?: string[];
};

export type FormObjectDoc = {
  id: string;
  title: string;
  pages: FormElementDoc[][];
};

export type FormDoc = {
  preview: FormObjectDoc;
  published: FormObjectDoc;
};

export type MediaElementType = {
  mediaType: string;
  [canononicalName: string]: string;
};

export type UserDoc = {
  forms: string[];
  media: MediaElementType[];
};
