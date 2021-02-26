export enum formElementType {
  RADIO,
  CHECKBOXES,
  SHORT_ANSWER,
  LONG_ANSWER,
  EMAIL,
  URL,
}

export const choiceFormElementTypes = [
  formElementType.RADIO,
  formElementType.CHECKBOXES,
];

export interface FormElement {
  question: string; // The question presented to the user
  type: formElementType; // The type of question this element is
  formElementKey: string; // A key for programmatic access
  helperText?: string; // The helper text to be presented to the user for additional instructions
  choices?: string[]; // Some types of questions have choices, like radio or checkbox questions
}

export interface FormObject {
  title: string;
  pages: string[][]; // Each page will be an array of strings, which will be different formElementKeys
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
