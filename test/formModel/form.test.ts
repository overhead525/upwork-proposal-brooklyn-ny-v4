import { Form } from "../../models";
import { FormDoc } from "../../models/types";
import { sampleFormV1 } from "../constants/form";
import { runValidationTestLogic } from "../sharedLogic";

describe("form schema validation is tight", () => {
  const missingPropertyValidationTest = async (missingProp: string) => {
    const testFormDoc: FormDoc = { ...sampleFormV1 };
    Object.defineProperty(testFormDoc, missingProp, {
      value: null,
    });

    const testForm = new Form(testFormDoc);

    await runValidationTestLogic(missingProp, testForm);
  };
  test("fails if no 'id' property is provided", async () => {
    await missingPropertyValidationTest("id");
  });

  test("fails if no 'preview' property is provided", async () => {
    await missingPropertyValidationTest("preview");
  });

  test("fails if no 'published' property is provided", async () => {
    await missingPropertyValidationTest("published");
  });
});
