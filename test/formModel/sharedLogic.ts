import { Document } from "mongoose";

export const runValidationTestLogic = (
  missingProp = "choices",
  testModel: Document<any>
) => {
  let flag = 0;

  return testModel.validate().then(
    () => flag++,
    (reason) => {
      expect(reason.message).toContain(
        `${"`" + missingProp + "`"} is required`
      );
      expect(flag).toBe(0);
    }
  );
};
