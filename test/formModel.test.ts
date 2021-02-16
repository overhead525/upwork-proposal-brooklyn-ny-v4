import { doesNotMatch } from "assert";
import { Schema } from "mongoose";
import { Form, FormElement, User } from "../models";
import { FormElementDoc } from "../models/types";
import { sampleFormElements } from "./constants/form";

describe("formElement schema validation is tight", () => {
  const missingPropertyValidationTest = async (missingProp: string) => {
    const testFormElementDoc: FormElementDoc = {
      ...sampleFormElements[0],
    };
    Object.defineProperty(testFormElementDoc, missingProp, {
      value: null,
    });

    const testFormElement = new FormElement(testFormElementDoc);

    let flag = 0;

    try {
      await testFormElement.validate();
      flag++;
    } catch (error) {
      expect(error.message).toContain(`${"`" + missingProp + "`"} is required`);
    }

    expect(flag).toBe(0);
  };

  const missingChoiceDefinitionsTest = async (
    formElementDoc: FormElementDoc
  ) => {
    const testFormElementDoc: FormElementDoc = {
      ...formElementDoc,
      choices: null,
    };
    const testFormElement = new FormElement(testFormElementDoc);

    let flag = 0;

    try {
      await testFormElement.validate();
      flag++;
    } catch (error) {
      expect(error.message).toContain("`choices` is required");
    }

    expect(flag).toBe(0);
  };

  test("fails if no 'question' property is provided", async () => {
    await missingPropertyValidationTest("question");
  });

  test("fails if no 'type' property is provided", async () => {
    await missingPropertyValidationTest("type");
  });

  test("fails if no 'questionKey' property is provided", async () => {
    await missingPropertyValidationTest("questionKey");
  });

  test("fails if 'choices' property is not filled on a question of type RADIO", async () => {
    await missingChoiceDefinitionsTest(sampleFormElements[2]);
  });

  test("fails if 'choices' property is not filled on a question of type CHECKBOXES", async () => {
    await missingChoiceDefinitionsTest(sampleFormElements[1]);
  });
});
