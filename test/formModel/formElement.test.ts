import { FormElement } from "../../models";
import { FormElementDoc } from "../../models/types";
import { sampleFormElements } from "../constants/form";
import { runValidationTestLogic } from "../sharedLogic";

beforeEach(() => jest.useFakeTimers());

describe("formElement schema validation is tight", () => {
  const missingPropertyValidationTest = async (missingProp: string) => {
    const testFormElementDoc: FormElementDoc = {
      ...sampleFormElements[0],
    };
    Object.defineProperty(testFormElementDoc, missingProp, {
      value: null,
    });

    const testFormElement = new FormElement(testFormElementDoc);

    await runValidationTestLogic(missingProp, testFormElement);
  };

  const missingChoiceDefinitionsTest = async (
    formElementDoc: FormElementDoc
  ) => {
    const testFormElementDoc: FormElementDoc = {
      ...formElementDoc,
      choices: null,
    };
    const testFormElement = new FormElement(testFormElementDoc);

    await runValidationTestLogic(undefined, testFormElement);
  };

  type referenceProp = "draftOf" | "displayFor";

  const missingReferenceTest = async (
    formElementDoc: FormElementDoc,
    refOption: referenceProp
  ) => {
    const determineTestDoc = (): FormElementDoc => {
      if (refOption === "draftOf")
        return { ...formElementDoc, draftOf: undefined };
      if (refOption === "displayFor")
        return {
          ...formElementDoc,
          displayFor: undefined,
        };
    };

    const testFormElementDoc: FormElementDoc = determineTestDoc();
    const testFormElement = new FormElement(testFormElementDoc);

    await runValidationTestLogic(refOption, testFormElement);
  };

  test("fails if no 'question' property is provided", async () => {
    await missingPropertyValidationTest("question");
  });

  test("fails if no 'type' property is provided", async () => {
    await missingPropertyValidationTest("type");
  });

  test("fails if no 'questionKey' property is provided", async () => {
    await missingPropertyValidationTest("formElementKey");
  });

  test("fails if 'choices' property is not filled on a question of type RADIO", async () => {
    await missingChoiceDefinitionsTest(sampleFormElements[2]);
  });

  test("fails if 'choices' property is not filled on a question of type CHECKBOXES", async () => {
    await missingChoiceDefinitionsTest(sampleFormElements[1]);
  });

  test("fails if 'draftOf' property is not defined when 'displayFor' is also undefined", async () => {
    await missingReferenceTest(sampleFormElements[0], "draftOf");
  });

  test("fails if 'draftOf' property is not defined when 'displayFor' is also undefined", async () => {
    await missingReferenceTest(sampleFormElements[2], "displayFor");
  });
});
