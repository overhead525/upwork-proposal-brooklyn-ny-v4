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
    formElementKey: "howOldAreYou",
    helperText: "Enter a number between 1 and 100 (endpoints inclusive)",
  },
  {
    question: "What would you like to eat?",
    type: formElementType.CHECKBOXES,
    formElementKey: "whatWouldYouLikeToEat",
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
    formElementKey: "howWouldYouLikeToPay",
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
  pages: [
    firstFormElementScramble.map((el) => el.formElementKey),
    secondFormElementScramble.map((el) => el.formElementKey),
  ],
};

export const sampleFormObjectV1: FormObject = {
  title: "Taking the Order v1",
  pages: [
    firstFormElementScramble.map((el) => el.formElementKey),
    secondFormElementScramble.map((el) => el.formElementKey),
  ],
};

export const sampleFormObjectV2Preview: FormObject = {
  title: "Taking the Order v2",
  pages: [
    secondFormElementScramble.map((el) => el.formElementKey),
    firstFormElementScramble.map((el) => el.formElementKey),
  ],
};

export const sampleFormObjectV2: FormObject = {
  title: "Taking the Order v2",
  pages: [
    secondFormElementScramble.map((el) => el.formElementKey),
    firstFormElementScramble.map((el) => el.formElementKey),
  ],
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
