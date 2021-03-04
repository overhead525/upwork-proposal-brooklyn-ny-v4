import { FormElementDoc } from "../models/types";

export const formElements: FormElementDoc[][] = [
  [
    {
      question: "Which party do you most associate with?",
      type: 0,
      questionKey: "whichPartyDoYouMostAssociateWith",
      helperText: "If 'independent', choose other",
      choices: ["Democrat", "Republican", "Green", "Other"],
      draftOf: "443ea603-f2ba-46e3-b08b-5b2dbb63e00c",
    },
    {
      question: "Which party do you associate with?",
      type: 0,
      questionKey: "whichPartyDoYouAssociateWith",
      helperText: "If you are 'independent', choose 'other'",
      choices: ["Democrat", "Republican", "Green", "Other"],
      displayFor: "6dfd3c7d-24a0-4db8-b66a-5f5f7bad1321",
    },
  ],
  [
    {
      question:
        "Were you satisfied with the outcome of the 2020 presidential election?",
      type: 1,
      questionKey: "wereYouSatisfiedWithTheOutcomeOf",
      choices: ["Yes", "No"],
      draftOf: "8f31a612-b6cf-4fc5-8d48-03d2e002a05f",
    },
    {
      question:
        "Were you satisfied with the outcome of the 2020 presidential election?",
      type: 1,
      questionKey: "wereYouSatisfiedWithTheOutcomeOf",
      choices: ["Yes", "No"],
      displayFor: "c2d81a07-b222-4f46-beb7-af6e47f1e1c4",
    },
  ],
  [
    {
      question:
        "What dissapointed you about the outcome of the 2020 presidential election?",
      type: 2,
      questionKey: "whatDissapointedYouAboutTheOutcomeOf",
      helperText: "Limit 200 characters",
      draftOf: "7738bec8-9bc0-45a5-a3f2-36179d2120df",
    },
    {
      question:
        "What dissapointed you about the outcome of the 2020 presidential election?",
      type: 2,
      questionKey: "whatDissapointedYouAboutTheOutcomeOf",
      helperText: "Limit 200 characters",
      displayFor: "812658ba-73d7-42ce-a867-6336faee79fa",
    },
  ],
  [
    {
      question: "Who do you know in Delta Kappa?",
      type: 2,
      questionKey: "whoDoYouKnowInDeltaKappa",
      helperText: "First and Last Name Please :)",
      draftOf: "b3bff7f2-f8be-49e7-a461-67619930e03e",
    },
    {
      question: "Who do you know in Delta Kappa?",
      type: 2,
      questionKey: "whoDoYouKnowInDeltaKappa",
      helperText: "First AND Last Name Please :)",
      displayFor: "75d4d24d-7a04-4fb7-a69c-e62a63fffe6b",
    },
  ],
  [
    {
      question: "Did you rush last year too?",
      type: 0,
      questionKey: "didYouRushLastYearToo",
      choices: ["Yes", "No"],
      draftOf: "5ee891a9-9736-47b2-b674-71e8459cbae0",
    },
    {
      question: "Did you rush last year?",
      type: 0,
      questionKey: "didYouRushLastYear",
      choices: ["Yes", "No"],
      displayFor: "61adbcad-7a11-4966-abdc-90f92cd197c7",
    },
  ],
  [
    {
      question: "During what year was Delta Kappa founded?",
      type: 0,
      questionKey: "duringWhatYearWasDeltaKappaFounded",
      choices: ["1967", "1890", "2005", "1974", "None of These"],
      draftOf: "16ba4744-c443-4f30-9e66-cf6960dda848",
    },
    {
      question: "During what year was Delta Kappa founded?",
      type: 0,
      questionKey: "duringWhatYearWasDeltaKappaFounded",
      choices: ["1967", "1890", "2005", "1974", "None of These"],
      displayFor: "9e71312b-cf3f-4fe1-93fa-7bdb7a5e6f2e",
    },
  ],
  [
    {
      question:
        "What previous Delta Kappa member played in the movie Inception in 2011?",
      type: 0,
      questionKey: "whatPreviousDeltaKappaMemberPlayedIn",
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
      type: 0,
      questionKey: "whatPreviousDeltaKappaMemberPlayedIn",
      choices: [
        "Elliot Page",
        "Marion Cotillard",
        "Joseph Gordon-Lewitt",
        "Leonardo DiCaprio",
      ],
      displayFor: "59f31484-0371-413d-aa2e-32514d0c6f69",
    },
  ],
];
