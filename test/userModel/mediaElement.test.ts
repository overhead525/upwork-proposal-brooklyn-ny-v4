import { MediaElement } from "../../models";
import { MediaElementType } from "../../models/types";
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
