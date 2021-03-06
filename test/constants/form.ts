// A file to store constants for tests in so we can re-use them

import {
  formElementType,
  FormElement,
  FormObject,
  Form,
} from "../../models/interfaces";
import { createScrambledArray } from "../../helpers";

export const sampleFormElements: FormElement[] = [
  {
    question: "How old are you?",
    type: formElementType.SHORT_ANSWER,
    questionKey: "howOldAreYou",
    helperText: "Enter a number between 1 and 100 (endpoints inclusive)",
    draftOf: "35484843-d1b7-4997-8c22-c080f644d8a6",
  },
  {
    question: "What would you like to eat?",
    type: formElementType.CHECKBOXES,
    questionKey: "whatWouldYouLikeToEat",
    helperText: "Choose as many as you'd like",
    choices: [
      "McDouble",
      "McFlurry",
      "Chicken Fries",
      "Onion Rings",
      "Boneless Honey BBQ Wings",
      "Blueberry Smoothie",
      "Grilled Tilapia",
    ],
  },
  {
    question: "How would you like to pay?",
    type: formElementType.RADIO,
    questionKey: "howWouldYouLikeToPay",
    choices: ["Debit Card", "Paypal", "Venmo", "Stripe", "Google Pay"],
    displayFor: "e4329830-1547-41ad-a0d8-e5c785a3382f",
  },
];

export const formElements = {
  "42f37e59-0779-50f2-8f41-cf361ecfbb5a": sampleFormElements[0],
  "df1505bb-7bd1-5652-b980-487062bba813": sampleFormElements[1],
  "04bc3efb-e7f1-5f35-8833-236b700e9969": sampleFormElements[2],
};

const firstFormElementScramble: string[] = createScrambledArray(
  Object.keys(formElements)
);

const secondFormElementScramble: string[] = createScrambledArray(
  Object.keys(formElements)
);

export const sampleFormObjectV1Preview: FormObject = {
  title: "Taking the Order v1 (preview)",
  pages: [firstFormElementScramble, secondFormElementScramble],
};

export const sampleFormObjectV1: FormObject = {
  title: "Taking the Order v1",
  pages: [firstFormElementScramble, secondFormElementScramble],
};

export const sampleFormObjectV2Preview: FormObject = {
  title: "Taking the Order v2",
  pages: [secondFormElementScramble, firstFormElementScramble],
};

export const sampleFormObjectV2: FormObject = {
  title: "Taking the Order v2",
  pages: [secondFormElementScramble, firstFormElementScramble],
};

export const sampleFormV1: Form = {
  preview: sampleFormObjectV1Preview,
  published: sampleFormObjectV1,
};

export const sampleFormV2: Form = {
  preview: sampleFormObjectV2Preview,
  published: sampleFormObjectV2,
};

export const forms = {
  "1b3ae3b6-b0de-45a9-bb96-fad12829f8e4": sampleFormV1,
  "9c5327ce-43d2-4483-a723-848abd611f4d": sampleFormV2,
};
