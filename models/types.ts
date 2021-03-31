import { formElementType } from "./interfaces";

export type OptionalFormElementDoc = {
  question?: string;
  type?: formElementType | string;
  questionKey?: string;
  helperText?: string;
  choices?: string[];
  draftOf?: string;
  displayFor?: string;
};

export type FormElementDoc = {
  question: string;
  type: formElementType | string;
  questionKey: string;
  helperText?: string;
  choices?: string[];
  draftOf?: string;
  displayFor?: string;
};

export type OptionalFormObjectDoc = {
  title?: string;
  pages?: string[][];
};

export type FormObjectDoc = {
  title: string;
  pages: string[][];
};

export type OptionalFormDoc = {
  preview?: OptionalFormObjectDoc;
  published?: OptionalFormObjectDoc;
};

export type FormDoc = {
  preview: FormObjectDoc;
  published: FormObjectDoc;
};

export type OptionalMediaElementDataTupleType = {
  canononicalName?: string;
  url?: string;
};

export type MediaElementDataTupleType = {
  canononicalName: string;
  url: string;
};

export type OptionalMediaElementType = {
  mediaType?: string;
  data: OptionalMediaElementDataTupleType[];
};

export type MediaElementType = {
  mediaType: string;
  data: MediaElementDataTupleType[];
};

export type OptionalUserDoc = {
  username?: string;
  forms?: string[];
  media?: OptionalMediaElementType[];
};

export type UserDoc = {
  username: string;
  forms: string[];
  media: MediaElementType[];
};
