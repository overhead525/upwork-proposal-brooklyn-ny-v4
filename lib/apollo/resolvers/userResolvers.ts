import { FormDoc, UserDoc } from "../../../models/types";
import { grabFormElementIDsFromForm } from "./shared";

export const UserResolvers = {
  Query: {
    getUser: async (_source, { userID }, { dataSources: { users } }) => {
      try {
        return await users.getUser({ userID });
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    createUser: async (_source, { username }, { dataSources: { users } }) => {
      try {
        return await users.createUser({ username });
      } catch (error) {
        return error;
      }
    },
    updateUserAddForms: async (
      _source,
      { username, formChanges },
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
      { username, formChanges },
      { dataSources: { users } }
    ) => {
      try {
        return await users.updateUserDeleteForms({ username, formChanges });
      } catch (error) {
        return error;
      }
    },
    deleteUser: async (
      _source,
      { userID },
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
