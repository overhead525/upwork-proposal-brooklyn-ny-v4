export enum formElementType {
  RADIO,
  CHECKBOXES,
  SHORT_ANSWER,
  LONG_ANSWER,
  EMAIL,
  URL,
}

export interface FormElement {
  question: string; // The question presented to the user
  type: formElementType; // The type of question this element is
  questionKey: string; // A key for programmatic access (usually the first few words (max 7) of the question)
  helperText?: string; // The helper text to be presented to the user for additional instructions
  choices?: string[]; // Some types of questions have choices, like radio or checkbox questions
}

export interface FormObject {
  title: string;
  pages: [FormElement[]];
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
