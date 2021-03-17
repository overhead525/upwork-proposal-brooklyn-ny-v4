import { FormDoc } from "../../../models/types";

export const grabFormElementIDsFromForm = (
  form: FormDoc,
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
