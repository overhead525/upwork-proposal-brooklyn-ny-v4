import { FormDoc } from "../../../models/types";
import { MutationDeleteFormArgs } from "../../../src/generated/graphql";
import { grabFormElementIDsFromForm } from "./shared";

export const FormResolvers = {
  Query: {
    getForm: async (_source, { formID }, { dataSources: { forms } }) => {
      try {
        return await forms.getForm({ formID });
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    createForm: async (_source, { form }, { dataSources: { forms } }) => {
      try {
        return await forms.createForm(form);
      } catch (error) {
        return error;
      }
    },
    deleteForm: async (
      _source,
      { formID }: MutationDeleteFormArgs,
      { dataSources: { forms, formElements } }
    ) => {
      try {
        const form: FormDoc = await forms.getForm({ formID });
        const formElementIDs: string[] = [];

        grabFormElementIDsFromForm(form, formElementIDs);

        formElementIDs.forEach(async (id) => {
          await formElements.deleteFormElement({ id });
        });

        const response = await forms.deleteForm({ formID });

        return response;
      } catch (error) {
        return error;
      }
    },
    updateForm: async (
      _source,
      { formID, alterationObject },
      { dataSources: { forms } }
    ) => {
      try {
        return await forms.updateForm(formID, alterationObject);
      } catch (error) {
        return error;
      }
    },
  },
};
