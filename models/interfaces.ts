export enum formElementType {
  RADIO,
  CHECKBOXES,
  SHORT_ANSWER,
  LONG_ANSWER,
  EMAIL,
  URL,
}

export interface FormElement {
  question: string;
  type: formElementType;
  questionKey: string;
  helperText?: string;
  choices?: [string];
}

export interface FormObject {
  title: string;
  pages: [[FormElement]];
  url: string;
}

export interface Form {
  preview: FormObject;
  published: FormObject;
}

export interface MediaElement {
  mediaType: string;
  [canononicalName: string]: string;
}

export interface User {
  forms: string[];
  media: MediaElement[];
}
