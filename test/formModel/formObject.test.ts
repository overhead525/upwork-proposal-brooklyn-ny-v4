import { FormObject } from "../../models";
import { FormObjectDoc } from "../../models/types";
import { sampleFormObjectV1 } from "../constants/form";
import { runValidationTestLogic } from "./sharedLogic";

describe("formObject schema validation is tight", () => {
  const missingPropertyValidationTest = (missingProp: string) => {
    const testFormObjectDoc: FormObjectDoc = { ...sampleFormObjectV1 };
    Object.defineProperty(testFormObjectDoc, missingProp, {
      value: null,
    });

    const testFormObject = new FormObject(testFormObjectDoc);

    runValidationTestLogic(missingProp, testFormObject);
  };

  test("fails if no title property is provided", async () => {
    missingPropertyValidationTest("title");
  });
});
