import { User } from "../testModels";
import { UserDoc } from "../../models/types";
import { marcus, jenny } from "../constants/user";
import { runValidationTestLogic } from "../sharedLogic";

beforeEach(() => jest.useFakeTimers());

describe("user schema validation is tight", () => {
  const missingPropertyValidationTest = async (missingProp: string) => {
    const testUserMarcusDoc: UserDoc = { ...marcus };
    Object.defineProperty(testUserMarcusDoc, missingProp, {
      value: null,
    });

    const testUserMarcus = new User(testUserMarcusDoc);

    await runValidationTestLogic(missingProp, testUserMarcus);
  };

  test("fails if no 'forms' property is provided", async () => {
    await missingPropertyValidationTest("forms");
  });

  test("fails if no 'media' property is provided", async () => {
    await missingPropertyValidationTest("media");
  });
});
