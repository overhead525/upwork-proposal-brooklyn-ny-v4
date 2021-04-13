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
    createForm: async (
      _source,
      { username, previewTitle, previewPages, publishedTitle, publishedPages },
      { dataSources: { forms, users } }
    ) => {
      try {
        const outcome = await forms.createForm({
          username,
          previewTitle,
          previewPages,
          publishedTitle,
          publishedPages,
        });
        await users.updateUserAddForms({
          username,
          formChanges: [outcome.id],
        });
        return outcome.form;
      } catch (error) {
        return error;
      }
    },
    deleteForm: async (
      _source,
      { username, formID }: MutationDeleteFormArgs,
      { dataSources: { forms, formElements, users } }
    ) => {
      try {
        const form: FormDoc = await forms.getForm({ formID });
        const formElementIDs: string[] = [];

        grabFormElementIDsFromForm(form, formElementIDs);

        formElementIDs.forEach(async (id) => {
          await formElements.deleteFormElement({ id });
        });

        const response = await forms.deleteForm({ username, formID });
        const response2 = await users.updateUserDeleteForms({
          username,
          formChanges: [formID],
        });

        return response;
      } catch (error) {
        return error;
      }
    },
    updateForm: async (
      _source,
      { formID, previewTitle, previewPages, publishedTitle, publishedPages },
      { dataSources: { forms } }
    ) => {
      try {
        return await forms.updateForm({
          formID,
          previewTitle,
          previewPages,
          publishedTitle,
          publishedPages,
        });
      } catch (error) {
        return error;
      }
    },
  },
};
