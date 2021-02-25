import { MediaElement, User } from "../../models/interfaces";
import { forms } from "../constants/form";
import { createScrambledArray } from "../../helpers";

const [idV1, idV2] = [...Object.keys(forms)];

export const sampleMediaElements: MediaElement[] = [
  {
    mediaType: "jpeg",
    "Portfolio Pic": "https://amazon.co.us/east-1/s3/portfolio-pic.jpeg",
    "D9Lkei4-2020-12-11": "https://amazon.co.us/east-1/s3/D9Lkei4.jpeg",
    "sasha-2019-04-01": "https://amazon.co.us/east-1/s3/sasha-2019-04-01.jpeg",
  },
  {
    mediaType: "mp4",
    "Graduation Video - Part 1":
      "https://amazon.co.us/east-1/s3/graduation-video-part-1.mp4",
    "Graduation Video - Part 2":
      "https://amazon.co.us/east-1/s3/graudation-video-part-2.mp4",
  },
  {
    mediaType: "wav",
    "Carl's Mixtape - Track 1":
      "https://amazon.co.us/east-1/s3/Carl%27s%20Mixtape%20-%20Part%201%0A",
  },
];

export const marcus: User = {
  forms: [idV1, idV2],
  media: createScrambledArray(sampleMediaElements),
};

export const jenny: User = {
  forms: [idV2, idV1],
  media: createScrambledArray(sampleMediaElements),
};
