import { FormDoc, UserDoc } from "../../../models/types";
import {
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
} from "../../../src/generated/graphql";
import { grabFormElementIDsFromForm } from "./shared";

export const UserResolvers = {
  Query: {
    getUser: async (
      _source,
      { username }: QueryGetUserArgs,
      { dataSources: { users } }
    ) => {
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
      { dataSources: { users } }
    ) => {
      try {
        return await users.createUser({ username });
      } catch (error) {
        return error;
      }
    },
    updateUserUsername: async (
      _source,
      { oldUsername, newUsername }: MutationUpdateUserUsernameArgs,
      { dataSources: { users } }
    ) => {
      try {
        return await users.updateUserUsername({ oldUsername, newUsername });
      } catch (error) {
        return error;
      }
    },
    updateUserAddForms: async (
      _source,
      { username, formChanges }: MutationUpdateUserAddFormsArgs,
      { dataSources: { users } }
    ) => {
      try {
        return await users.updateUserAddForms({ username, formChanges });
      } catch (error) {
        return error;
      }
    },
    updateUserDeleteForms: async (
      _source,
      { username, formChanges }: MutationUpdateUserDeleteFormsArgs,
      { dataSources: { users } }
    ) => {
      try {
        return await users.updateUserDeleteForms({ username, formChanges });
      } catch (error) {
        return error;
      }
    },
    updateUserMediaName: async (
      _source,
      { username, oldMediaName, newMediaName }: MutationUpdateUserMediaNameArgs,
      { dataSources: { users } }
    ) => {
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
      { dataSources: { users } }
    ) => {
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
      { dataSources: { users } }
    ) => {
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
      { dataSources: { users } }
    ) => {
      try {
        return await users.updateUserDeleteMedia({ username, mediaName });
      } catch (error) {
        return error;
      }
    },
    deleteUser: async (
      _source,
      { userID }: MutationDeleteUserArgs,
      { dataSources: { users, forms, formElements } }
    ) => {
      try {
        const user: UserDoc = await users.getUser(userID);
        const userForms: FormDoc[] = forms.getForms(user.forms);
        const userFormElementIDs: string[] = [];

        userForms.forEach((form) => {
          grabFormElementIDsFromForm(form, userFormElementIDs);
        });

        // Delete formElements associated with current user
        userFormElementIDs.forEach(async (formElementID) => {
          await formElements.deleteFormElement(formElementID);
        });

        // Delete forms associated with current user
        user.forms.forEach(async (formID) => {
          await forms.deleteForm(formID);
        });

        // Delete current user
        await users.deleteUser(user.username);

        return `Successfully deleted user ${user.username}`;
      } catch (error) {
        return error;
      }
    },
  },
};
