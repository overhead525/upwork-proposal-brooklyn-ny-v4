import { FormObject } from "../../models";
import { FormObjectDoc } from "../../models/types";
import { sampleFormObjectV1 } from "../constants/form";
import { runValidationTestLogic } from "./sharedLogic";

describe("formObject schema validation is tight", () => {
  const missingPropertyValidationTest = async (missingProp: string) => {
    const testFormObjectDoc: FormObjectDoc = { ...sampleFormObjectV1 };
    Object.defineProperty(testFormObjectDoc, missingProp, {
      value: null,
    });

    const testFormObject = new FormObject(testFormObjectDoc);

    await runValidationTestLogic(missingProp, testFormObject);
  };

  test("fails if no 'title' property is provided", async () => {
    await missingPropertyValidationTest("title");
  });
  test("fails if no 'pages' property is provided", async () => {
    await missingPropertyValidationTest("pages");
  });
  test("fails if no 'url' property is provided", async () => {
    await missingPropertyValidationTest("url");
  });
});
