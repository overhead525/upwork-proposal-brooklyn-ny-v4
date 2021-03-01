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
  questionKey: string; // A key for programmatic access
  helperText?: string; // The helper text to be presented to the user for additional instructions
  choices?: string[]; // Some types of questions have choices, like radio or checkbox questions
  draftOf?: string; // A uuid string of the "published" version of this formElement
  displayFor?: string; // A uuid string of the "preview" version of this formElement
}

export interface FormObject {
  title: string;
  pages: string[][];
}

export interface Form {
  preview: FormObject;
  published: FormObject;
}

interface MediaElementDataTuple {
  canononicalName: string;
  url: string;
}

export interface MediaElement {
  mediaType: string;
  data: MediaElementDataTuple[];
}

export interface User {
  forms: string[];
  media: MediaElement[];
}
