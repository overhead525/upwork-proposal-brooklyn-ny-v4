import { FormElementDoc } from "../models/types";

export const formElements: FormElementDoc[] = [
  {
    question: "Which party do you most associate with?",
    type: "radio",
    questionKey: "261271ac-8bd8-4a4e-8697-92a7e015f1b5",
    helperText: "If 'independent', choose other",
    choices: ["Democrat", "Republican", "Green", "Other"],
    draftOf: "443ea603-f2ba-46e3-b08b-5b2dbb63e00c",
  },
  {
    question: "Which party do you associate with?",
    type: "radio",
    questionKey: "261271ac-8bd8-4a4e-8697-92a7e015f1b5",
    helperText: "If you are 'independent', choose 'other'",
    choices: ["Democrat", "Republican", "Green", "Other"],
    displayFor: "6dfd3c7d-24a0-4db8-b66a-5f5f7bad1321",
  },
  {
    question:
      "Were you satisfied with the outcome of the 2020 presidential election?",
    type: "checkbox",
    questionKey: "cc6a6b57-2fb1-412c-ada5-20d7bce24b47",
    choices: ["Yes", "No"],
    draftOf: "8f31a612-b6cf-4fc5-8d48-03d2e002a05f",
  },
  {
    question:
      "Were you satisfied with the outcome of the 2020 presidential election?",
    type: "checkbox",
    questionKey: "cc6a6b57-2fb1-412c-ada5-20d7bce24b47",
    choices: ["Yes", "No"],
    displayFor: "c2d81a07-b222-4f46-beb7-af6e47f1e1c4",
  },
  {
    question:
      "What dissapointed you about the outcome of the 2020 presidential election?",
    type: "shortAnswer",
    questionKey: "4daf9a28-e4d4-4c24-b65f-6b3dc8312a36",
    helperText: "Limit 200 characters",
    draftOf: "7738bec8-9bc0-45a5-a3f2-36179d2120df",
  },
  {
    question:
      "What dissapointed you about the outcome of the 2020 presidential election?",
    type: "shortAnswer",
    questionKey: "4daf9a28-e4d4-4c24-b65f-6b3dc8312a36",
    helperText: "Limit 200 characters",
    displayFor: "812658ba-73d7-42ce-a867-6336faee79fa",
  },
  {
    question: "Who do you know in Delta Kappa?",
    type: "shortAnswer",
    questionKey: "256397b9-3be0-4f14-afa5-50d92412dff9",
    helperText: "First and Last Name Please :)",
    draftOf: "b3bff7f2-f8be-49e7-a461-67619930e03e",
  },
  {
    question: "Who do you know in Delta Kappa?",
    type: "shortAnswer",
    questionKey: "256397b9-3be0-4f14-afa5-50d92412dff9",
    helperText: "First AND Last Name Please :)",
    displayFor: "75d4d24d-7a04-4fb7-a69c-e62a63fffe6b",
  },
  {
    question: "Did you rush last year too?",
    type: "radio",
    questionKey: "200d4daa-392d-4778-a25f-6c9f84e467e0",
    choices: ["Yes", "No"],
    draftOf: "5ee891a9-9736-47b2-b674-71e8459cbae0",
  },
  {
    question: "Did you rush last year?",
    type: "radio",
    questionKey: "200d4daa-392d-4778-a25f-6c9f84e467e0",
    choices: ["Yes", "No"],
    displayFor: "61adbcad-7a11-4966-abdc-90f92cd197c7",
  },
  {
    question: "During what year was Delta Kappa founded?",
    type: "radio",
    questionKey: "e08f3c21-5a52-4729-ba36-9b0c2a029365",
    choices: ["1967", "1890", "2005", "1974", "None of These"],
    draftOf: "16ba4744-c443-4f30-9e66-cf6960dda848",
  },
  {
    question: "During what year was Delta Kappa founded?",
    type: "radio",
    questionKey: "e08f3c21-5a52-4729-ba36-9b0c2a029365",
    choices: ["1967", "1890", "2005", "1974", "None of These"],
    displayFor: "9e71312b-cf3f-4fe1-93fa-7bdb7a5e6f2e",
  },
  {
    question:
      "What previous Delta Kappa member played in the movie Inception in 2011?",
    type: "radio",
    questionKey: "172e0771-bde8-4a96-9928-d0e9ef109f7a",
    choices: [
      "Liam Neeson",
      "Marion Cotillard",
      "Joseph Gordon-Lewitt",
      "Leonardo DiCaprio",
    ],
    draftOf: "0f287274-8ed9-4ac9-8367-43c6ffcdce52",
  },
  {
    question:
      "What previous Delta Kappa member played in the movie Inception in 2011?",
    type: "radio",
    questionKey: "172e0771-bde8-4a96-9928-d0e9ef109f7a",
    choices: [
      "Elliot Page",
      "Marion Cotillard",
      "Joseph Gordon-Lewitt",
      "Leonardo DiCaprio",
    ],
    displayFor: "59f31484-0371-413d-aa2e-32514d0c6f69",
  },
];
