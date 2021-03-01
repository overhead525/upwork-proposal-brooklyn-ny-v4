import { MediaElement, MediaElementDataTuple } from "../../models";
import {
  MediaElementDataTupleType,
  MediaElementType,
} from "../../models/types";
import { sampleMediaElements } from "../constants/user";
import { runValidationTestLogic } from "../sharedLogic";

beforeEach(() => jest.useFakeTimers());

describe("mediaElement schema validation is tight", () => {
  const missingPropertyValidationTest = async (missingProp: string) => {
    const testMediaElementDoc: MediaElementType = {
      ...sampleMediaElements[0],
    };
    Object.defineProperty(testMediaElementDoc, missingProp, {
      value: null,
    });

    const testMediaElement = new MediaElement(testMediaElementDoc);

    await runValidationTestLogic(missingProp, testMediaElement);
  };

  test("fails if no 'mediaType' property is provided", async () => {
    await missingPropertyValidationTest("mediaType");
  });

  test("fails if no 'data' property is provided", async () => {
    await missingPropertyValidationTest("data");
  });
});

describe("mediaElementDataTuple schema validation is tight", () => {
  const missingPropertyValidationTest = async (missingProp: string) => {
    const testMediaElementDataTupleDoc: MediaElementDataTupleType = {
      ...sampleMediaElements[0].data[0],
    };

    Object.defineProperty(testMediaElementDataTupleDoc, missingProp, {
      value: null,
    });

    const testMediaElementDataTuple = new MediaElementDataTuple(
      testMediaElementDataTupleDoc
    );

    await runValidationTestLogic(missingProp, testMediaElementDataTuple);
  };

  test("fails if no 'canononicalName' property is provided", async () => {
    await missingPropertyValidationTest("canononicalName");
  });

  test("fails if no 'url' property is provided", async () => {
    await missingPropertyValidationTest("url");
  });
});
