import {
  Form,
  FormElement,
  Maybe,
  MutationCreatePreviewFormElementArgs,
  MutationCreatePublishedFormElementArgs,
  MutationDeleteFormElementArgs,
  MutationUpdateFormElementArgs,
  QueryGetFormElementArgs,
} from "../../../src/generated/graphql";
import { FormElements } from "../data-sources/FormElements";
import { Forms } from "../data-sources/Forms";
import { FEFormNotFoundError, FEFormPageNotFoundError } from "./errors";

export const FormElementResolvers = {
  Query: {
    getFormElement: async (
      _source,
      { formElementID }: QueryGetFormElementArgs,
      {
        dataSources: { formElements },
      }: { dataSources: { formElements: FormElements } }
    ): Promise<Maybe<FormElement>> => {
      try {
        return await formElements.getFormElement({ formElementID });
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    createPreviewFormElement: async (
      _source,
      {
        formID,
        pageNumber,
        pageContent,
        question,
        type,
        questionKey,
        helperText,
        choices,
        draftOf = undefined,
      }: MutationCreatePreviewFormElementArgs,
      {
        dataSources: { forms, formElements },
      }: { dataSources: { forms: Forms; formElements: FormElements } }
    ): Promise<Maybe<FormElement>> => {
      try {
        const formElementArgs = {
          formID,
          pageNumber,
          pageContent,
          question,
          type,
          questionKey,
          helperText,
          choices,
          draftOf,
        };
        const form: Form = await forms.getForm({ formID });
        if (!form) throw FEFormNotFoundError(formID);
        if (!form.published.pages[pageNumber])
          throw FEFormPageNotFoundError(formID, pageNumber);

        const feCreateResponse = await formElements.createPreviewFormElement(
          formElementArgs
        );

        const newPreviewPages = [...form.preview.pages];
        const newPageContent = pageContent.map((feID) => {
          if (feID === "") return feCreateResponse.previewID;
          return feID;
        });
        newPreviewPages[pageNumber] = newPageContent;

        const formUpdateResponse = await forms.updateForm({
          formID,
          previewPages: newPreviewPages,
        });

        return feCreateResponse.formElement;
      } catch (error) {
        return error;
      }
    },
    createPublishedFormElement: async (
      _source,
      {
        formID,
        pageNumber,
        pageContent,
        question,
        type,
        questionKey,
        helperText,
        choices,
        displayFor = undefined,
      }: MutationCreatePublishedFormElementArgs,
      {
        dataSources: { forms, formElements },
      }: { dataSources: { forms: Forms; formElements: FormElements } }
    ): Promise<Maybe<FormElement>> => {
      try {
        const formElementArgs = {
          formID,
          pageNumber,
          pageContent,
          question,
          type,
          questionKey,
          helperText,
          choices,
          displayFor,
        };

        const form: Form = await forms.getForm({ formID });
        if (!form) throw FEFormNotFoundError(formID);
        if (!form.published.pages[pageNumber])
          throw FEFormPageNotFoundError(formID, pageNumber);

        const feCreateResponse = await formElements.createPublishedFormElement(
          formElementArgs
        );

        const newPublishedPages = [...form.published.pages];
        const newPageContent = pageContent.map((feID) => {
          if (feID === "") return feCreateResponse.publishedID;
          return feID;
        });
        newPublishedPages[pageNumber] = newPageContent;

        const formUpdateResponse = await forms.updateForm({
          formID,
          publishedPages: newPublishedPages,
        });

        return feCreateResponse.formElement;
      } catch (error) {
        return error;
      }
    },
    deleteFormElement: async (
      _source,
      {
        formID,
        formElementID,
        formStatus,
        pageNumber,
      }: MutationDeleteFormElementArgs,
      {
        dataSources: { forms, formElements },
      }: { dataSources: { forms: Forms; formElements: FormElements } }
    ): Promise<Boolean> => {
      try {
        const fS = formStatus.toLowerCase();
        if (!(fS === "preview" || fS === "published")) {
          throw new Error(
            "formStatus invalid. must be 'preview' or 'published'"
          );
        }

        const form = await forms.getForm({ formID });
        if (!form) throw FEFormNotFoundError(formID);
        if (!form[formStatus][pageNumber])
          throw FEFormPageNotFoundError(formID, pageNumber);

        const feDeleteResponse = await formElements.deleteFormElement({
          formID,
          formElementID,
          pageNumber,
          formStatus,
        });

        if (formStatus === "preview") {
          const newPreviewPages = [...form.preview.pages];
          newPreviewPages[pageNumber].filter((feID) => feID !== formElementID);

          await forms.updateForm({ formID, previewPages: newPreviewPages });
        } else if (formStatus === "published") {
          const newPublishedPages = [...form.published.pages];
          newPublishedPages[pageNumber].filter(
            (feID) => feID !== formElementID
          );

          await forms.updateForm({ formID, publishedPages: newPublishedPages });
        }

        return feDeleteResponse;
      } catch (error) {
        return error;
      }
    },
    updateFormElement: async (
      _source,
      {
        formElementID,
        question = undefined,
        type = undefined,
        questionKey = undefined,
        helperText = undefined,
        choices = undefined,
        draftOf = undefined,
        displayFor = undefined,
      }: MutationUpdateFormElementArgs,
      {
        dataSources: { formElements },
      }: { dataSources: { formElements: FormElements } }
    ): Promise<Maybe<FormElement>> => {
      try {
        const alterationObject = {
          question,
          type,
          questionKey,
          helperText,
          choices,
          draftOf,
          displayFor,
        };
        Object.entries(alterationObject).forEach((pair) => {
          if (!pair[1]) delete alterationObject[pair[0].toString()];
        });
        return await formElements.updateFormElement({
          formElementID,
          ...alterationObject,
        });
      } catch (error) {
        return error;
      }
    },
  },
};
