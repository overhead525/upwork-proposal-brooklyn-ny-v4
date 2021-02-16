import { Document } from "mongoose";

export const runValidationTestLogic = (
  missingProp = "choices",
  testModel: Document<any>
) => {
  let flag = 0;

  testModel
    .validate()
    .then(() => flag++)
    .catch((err) => {
      expect(err.message).toContain(`${"`" + missingProp + "`"} is required`);
    });

  expect(flag).toBe(0);
};
