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

export type UserDoc = Document & {
  forms: [string];
  media: {
    [mediaType: string]: {
      // video: me-in-the-woods.mp4
      [canononicalName: string]: string;
    };
  };
};
