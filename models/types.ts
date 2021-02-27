import { Document } from "mongoose";

import { formElementType } from "./interfaces";

export type FormElementDoc = {
  question: string;
  type: formElementType;
  questionKey: string;
  helperText?: string;
  choices?: string[];
  draftOf?: string;
  displayFor?: string;
};

export type FormObjectDoc = {
  title: string;
  pages: string[][];
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
