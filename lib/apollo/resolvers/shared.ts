import { FormDoc } from "../../../models/types";
import { Form } from "../../../src/generated/graphql";

export const grabFormElementIDsFromForm = (
  form: FormDoc | Form,
  formElementIDArr: string[]
) => {
  form.preview.pages.forEach((page) => {
    page.forEach((formElementID) => {
      formElementIDArr.push(formElementID);
    });
  });

  form.published.pages.forEach((page) => {
    page.forEach((formElementID) => {
      formElementIDArr.push(formElementID);
    });
  });
};

export const grabFormElementIDsFromFormV2 = (form: FormDoc | Form) => {
  const formElementIDArr: string[] = [];
  form.preview.pages.forEach((page) => {
    page.forEach((formElementID) => {
      formElementIDArr.push(formElementID);
    });
  });

  form.published.pages.forEach((page) => {
    page.forEach((formElementID) => {
      formElementIDArr.push(formElementID);
    });
  });

  return formElementIDArr;
};
