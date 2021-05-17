import { FormDoc } from "../../../models/types";
import {
  Form,
  Maybe,
  MutationCreateFormArgs,
  MutationDeleteFormArgs,
  MutationUpdateFormArgs,
  QueryGetFormArgs,
  Scalars,
} from "../../../src/generated/graphql";
import { FormElements } from "../data-sources/FormElements";
import { Forms } from "../data-sources/Forms";
import { Users } from "../data-sources/Users";
import { grabFormElementIDsFromForm } from "./shared";

export const FormResolvers = {
  Query: {
    getForm: async (
      _source,
      { formID }: QueryGetFormArgs,
      { dataSources: { forms } }: { dataSources: { forms: Forms } }
    ): Promise<Maybe<Form>> => {
      try {
        return await forms.getForm({ formID });
      } catch (error) {
        return error;
      }
    },
    getAllFormIDs: async (
      _source,
      {},
      { dataSources: { forms } }: { dataSources: { forms: Forms } }
    ): Promise<Maybe<Array<Scalars["String"]>>> => {
      try {
        return await forms.getAllFormIDs();
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    createForm: async (
      _source,
      {
        username,
        previewTitle,
        previewPages,
        publishedTitle,
        publishedPages,
      }: MutationCreateFormArgs,
      {
        dataSources: { forms, users },
      }: { dataSources: { forms: Forms; users: Users } }
    ): Promise<Maybe<Form>> => {
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
      {
        dataSources: { forms, formElements, users },
      }: {
        dataSources: { forms: Forms; formElements: FormElements; users: Users };
      }
    ): Promise<Boolean> => {
      try {
        const form: FormDoc = await forms.getForm({ formID });
        const formElementIDs: string[] = [];

        grabFormElementIDsFromForm(form, formElementIDs);

        formElementIDs.forEach(async (id) => {
          await formElements.deleteFormElement({
            formElementID: id,
            formID: "",
            formStatus: "",
            pageNumber: 0,
          });
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
      {
        formID,
        previewTitle,
        previewPages,
        publishedTitle,
        publishedPages,
      }: MutationUpdateFormArgs,
      { dataSources: { forms } }: { dataSources: { forms: Forms } }
    ): Promise<Maybe<Form>> => {
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
