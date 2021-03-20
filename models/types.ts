import { formElementType } from "./interfaces";

export type OptionalFormElementDoc = FormElementDoc & {
  question?: string;
  type?: formElementType | string;
  questionKey?: string;
  helperText?: string;
  choices?: string[];
  draftOf?: string;
  displayFor?: string;
};

export type FormElementDoc = Document & {
  question: string;
  type: formElementType | string;
  questionKey: string;
  helperText?: string;
  choices?: string[];
  draftOf?: string;
  displayFor?: string;
};

export type OptionalFormObjectDoc = FormObjectDoc & {
  title?: string;
  pages?: string[][];
};

export type FormObjectDoc = Document & {
  title: string;
  pages: string[][];
};

export type OptionalFormDoc = FormDoc & {
  preview?: OptionalFormObjectDoc;
  published?: OptionalFormObjectDoc;
};

export type FormDoc = Document & {
  preview: FormObjectDoc;
  published: FormObjectDoc;
};

export type OptionalMediaElementDataTupleType = MediaElementDataTupleType & {
  canononicalName?: string;
  url?: string;
};

export type MediaElementDataTupleType = {
  canononicalName: string;
  url: string;
};

export type OptionalMediaElementType = MediaElementType & {
  mediaType?: string;
  data: OptionalMediaElementDataTupleType[];
};

export type MediaElementType = {
  mediaType: string;
  data: MediaElementDataTupleType[];
};

export type OptionalUserDoc = UserDoc & {
  username?: string;
  forms?: string[];
  media?: OptionalMediaElementType[];
};

export type UserDoc = Document & {
  username: string;
  forms: string[];
  media: MediaElementType[];
};
