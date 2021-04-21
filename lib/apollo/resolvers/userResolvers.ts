import { FormDoc, UserDoc } from "../../../models/types";
import {
  Form,
  Maybe,
  MutationCreateUserArgs,
  MutationDeleteUserArgs,
  MutationUpdateUserAddFormsArgs,
  MutationUpdateUserAddMediaArgs,
  MutationUpdateUserDeleteFormsArgs,
  MutationUpdateUserDeleteMediaArgs,
  MutationUpdateUserMediaNameArgs,
  MutationUpdateUserMediaUrlArgs,
  MutationUpdateUserUsernameArgs,
  QueryGetUserArgs,
  User,
} from "../../../src/generated/graphql";
import { FormElements } from "../data-sources/FormElements";
import { Forms } from "../data-sources/Forms";
import { Users } from "../data-sources/Users";
import { grabFormElementIDsFromForm } from "./shared";

export const UserResolvers = {
  Query: {
    getUser: async (
      _source,
      { username }: QueryGetUserArgs,
      { dataSources: { users } }: { dataSources: { users: Users } }
    ): Promise<Maybe<User>> => {
      try {
        return await users.getUser({ username });
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    createUser: async (
      _source,
      { username }: MutationCreateUserArgs,
      { dataSources: { users } }: { dataSources: { users: Users } }
    ): Promise<Maybe<User>> => {
      try {
        return await users.createUser({ username });
      } catch (error) {
        return error;
      }
    },
    updateUserUsername: async (
      _source,
      { oldUsername, newUsername }: MutationUpdateUserUsernameArgs,
      { dataSources: { users } }: { dataSources: { users: Users } }
    ): Promise<Maybe<User>> => {
      try {
        return await users.updateUserUsername({ oldUsername, newUsername });
      } catch (error) {
        return error;
      }
    },
    updateUserAddForms: async (
      _source,
      { username, formChanges }: MutationUpdateUserAddFormsArgs,
      { dataSources: { users } }: { dataSources: { users: Users } }
    ): Promise<Maybe<User>> => {
      try {
        return await users.updateUserAddForms({ username, formChanges });
      } catch (error) {
        return error;
      }
    },
    updateUserDeleteForms: async (
      _source,
      { username, formChanges }: MutationUpdateUserDeleteFormsArgs,
      { dataSources: { users } }: { dataSources: { users: Users } }
    ): Promise<Maybe<User>> => {
      try {
        return await users.updateUserDeleteForms({ username, formChanges });
      } catch (error) {
        return error;
      }
    },
    updateUserMediaName: async (
      _source,
      { username, oldMediaName, newMediaName }: MutationUpdateUserMediaNameArgs,
      { dataSources: { users } }: { dataSources: { users: Users } }
    ): Promise<Maybe<User>> => {
      try {
        return await users.updateUserMediaName({
          username,
          oldMediaName,
          newMediaName,
        });
      } catch (error) {
        return error;
      }
    },
    updateUserMediaURL: async (
      _source,
      { username, mediaName, newMediaURL }: MutationUpdateUserMediaUrlArgs,
      { dataSources: { users } }: { dataSources: { users: Users } }
    ): Promise<Maybe<User>> => {
      try {
        return await users.updateUserMediaURL({
          username,
          mediaName,
          newMediaURL,
        });
      } catch (error) {
        return error;
      }
    },
    updateUserAddMedia: async (
      _source,
      { username, mediaName, mediaURL }: MutationUpdateUserAddMediaArgs,
      { dataSources: { users } }: { dataSources: { users: Users } }
    ): Promise<Maybe<User>> => {
      try {
        return await users.updateUserAddMedia({
          username,
          mediaName,
          mediaURL,
        });
      } catch (error) {
        return error;
      }
    },
    updateUserDeleteMedia: async (
      _source,
      { username, mediaName }: MutationUpdateUserDeleteMediaArgs,
      { dataSources: { users } }: { dataSources: { users: Users } }
    ): Promise<Maybe<User>> => {
      try {
        return await users.updateUserDeleteMedia({ username, mediaName });
      } catch (error) {
        return error;
      }
    },
    deleteUser: async (
      _source,
      { username }: MutationDeleteUserArgs,
      {
        dataSources: { users, forms, formElements },
      }: {
        dataSources: { users: Users; forms: Forms; formElements: FormElements };
      }
    ): Promise<Boolean> => {
      try {
        const user: User = await users.getUser({ username });

        user.forms.forEach(async (formID) => {
          const form = await forms.getForm({ formID });

          // Recursively delete all formElements from each page in the preview version of the form
          form.preview.pages.forEach((page, pageNumber) => {
            page.forEach(async (formElementID) => {
              await formElements.deleteFormElement({
                formStatus: "preview",
                formElementID,
                formID: formID,
                pageNumber,
              });
            });
          });

          // Recursively delete all formElements from each pages in the published version of the form
          form.published.pages.forEach((page, pageNumber) => {
            page.forEach(async (formElementID) => {
              await formElements.deleteFormElement({
                formStatus: "published",
                formElementID,
                formID: formID,
                pageNumber,
              });
            });
          });

          // Delete the form from the forms table
          await forms.deleteForm({ username, formID });
        });

        // Remove the user from the users table
        return await users.deleteUser({ username });
      } catch (error) {
        return error;
      }
    },
  },
};
