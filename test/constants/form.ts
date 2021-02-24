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
  },
];

const firstFormElementScramble: FormElement[] = createScrambledArray(
  sampleFormElements
);

const secondFormElementScramble: FormElement[] = createScrambledArray(
  sampleFormElements
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
  id: "1b3ae3b6-b0de-45a9-bb96-fad12829f8e4",
  preview: sampleFormObjectV1Preview,
  published: sampleFormObjectV1,
};

export const sampleFormV2: Form = {
  id: "9c5327ce-43d2-4483-a723-848abd611f4d",
  preview: sampleFormObjectV2Preview,
  published: sampleFormObjectV2,
};
