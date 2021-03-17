import { FormDoc } from "../../../models/types";
import { grabFormElementIDsFromForm } from "./shared";

export const FormResolvers = {
  Query: {
    getForm: async (_source, { formID }, { dataSources: { forms } }) => {
      await forms.getForm(formID);
    },
  },
  Mutation: {
    deleteForm: async (
      _source,
      { formID },
      { dataSources: { forms, formElements } }
    ) => {
      try {
        const form: FormDoc = await forms.getForm(formID);
        const formElementIDs: string[] = [];

        grabFormElementIDsFromForm(form, formElementIDs);

        formElementIDs.forEach(async (id) => {
          await formElements.deleteFormElement(id);
        });

        const response = await forms.deleteForm(formID);

        if (response === true) return `successfully deleted form: ${formID}`;
        return response; // as Error
      } catch (error) {
        return error;
      }
    },
  },
};
