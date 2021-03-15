import { Document } from "mongoose";

import { formElementType } from "./interfaces";

export type FormElementDoc = {
  question: string;
  type: formElementType | string;
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

export type MediaElementDataTupleType = {
  canononicalName: string;
  url: string;
};

export type MediaElementType = {
  mediaType: string;
  data: MediaElementDataTupleType[];
};

export type UserDoc = {
  username: string;
  forms: string[];
  media: MediaElementType[];
};
