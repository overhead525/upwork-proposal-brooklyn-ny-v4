import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  User,
  Form,
  FormElement,
  FormObject,
  Scalars,
} from "../../src/generated/graphql";

export const fetchAllData = createAsyncThunk(
  "userData/fetchUserData",
  async (username: string, thunkAPI) => {
    try {
      const userQuery = `
      query GetUser($username: String!) {
        getUser(username: $username) {
          username
          forms
          media {
            mediaType
            data {
              url
              canononicalName
            }
          }
        }
      }
    `;

      const formQuery = `
      query GetForm($formID: String!) {
        getForm(formID: $formID) {
          preview {
            title
            pages
          }
          published {
            title
            pages
          }
        }
      }
    `;

      const formElementQuery = `
      query GetFormElement($formElementID: String!) {
        getFormElement(formElementID: $formElementID) {
          question
          type
          questionKey
          helperText
          choices
          draftOf
          displayFor
        }
      }
      `;

      const userResponse = await fetch("http://localhost:3000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: userQuery,
          variables: { username },
        }),
      });

      const parsedUser = await userResponse.json();
      const userData = parsedUser.data.getUser as User;

      const formIDs = userData.forms;

      const formData: { [key: string]: Form } = await formIDs.reduce(
        async (o, formID) => {
          const formResponse = await fetch("http://localhost:3000/api/data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              query: formQuery,
              variables: { formID },
            }),
          });

          const parsedForm = await formResponse.json();
          const data = parsedForm.data.getForm;

          return { ...(await o), [formID]: data as Form };
        },
        {}
      );

      let formElementIDs = [];

      const formElementData = Object.entries(formData).reduce(
        async (o, formPair) => {
          formPair[1].preview.pages.forEach((page) => {
            page.forEach((id) => formElementIDs.push(id));
          });

          formPair[1].published.pages.forEach((page) => {
            page.forEach((id) => formElementIDs.push(id));
          });

          const formElementData: {
            [key: string]: FormElement;
          } = await formElementIDs.reduce(async (o, formElementID) => {
            const formElementResponse = await fetch(
              "http://localhost:3000/api/data",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  query: formElementQuery,
                  variables: { formElementID },
                }),
              }
            );

            const parsedFormElement = await formElementResponse.json();
            const data = parsedFormElement.data.getFormElement;

            const result = { ...(await o), [formElementID]: data };
            return result;
          }, {});

          return formElementData;
        },
        {}
      );

      return { userData, formData, formElementData: await formElementData };
    } catch (error) {
      console.error(error);
      return {};
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "userData/fetchUserData",
  async (username: string, thunkAPI) => {
    try {
      const userQuery = `
      query GetUser($username: String!) {
        getUser(username: $username) {
          username
          forms
          media {
            mediaType
            data {
              url
              canononicalName
            }
          }
        }
      }
    `;

      const userResponse = await fetch("http://localhost:3000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: userQuery,
          variables: { username },
        }),
      });

      const parsedUser = await userResponse.json();
      return parsedUser.data.getUser;
    } catch (error) {
      console.error(error);
      return {};
    }
  }
);

export const fetchFormData = createAsyncThunk(
  "userData/fetchFormData",
  async (formIDs: string[], thunkAPI) => {
    try {
      const formQuery = `
      query GetForm($formID: String!) {
        getForm(formID: $formID) {
          preview {
            title
            pages
          }
          published {
            title
            pages
          }
        }
      }
    `;

      const formData = await formIDs.reduce(async (o, formID) => {
        const formResponse = await fetch("http://localhost:3000/api/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: formQuery,
            variables: { formID },
          }),
        });

        const parsedForm = await formResponse.json();
        const data = parsedForm.data.getForm;

        return { ...(await o), [formID]: data };
      }, {});

      return formData;
    } catch (error) {
      console.error(error);
      return {};
    }
  }
);

export const fetchFormElementData = createAsyncThunk(
  "userData/fetchFormElementData",
  async (formElementIDs: string[], thunkAPI) => {
    try {
      const formElementQuery = `
      query GetFormElement($formElementID: String!) {
        getFormElement(formElementID: $formElementID) {
          question
          type
          questionKey
          helperText
          choices
          draftOf
          displayFor
        }
      }
      `;

      const formElementData = await formElementIDs.reduce(
        async (o, formElementID) => {
          const formElementResponse = await fetch(
            "http://localhost:3000/api/data",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                query: formElementQuery,
                variables: { formElementID },
              }),
            }
          );

          const parsedFormElement = await formElementResponse.json();
          const data = parsedFormElement.data.getFormElement;

          const result = { ...(await o), [formElementID]: data };
          return result;
        },
        {}
      );

      return await formElementData;
    } catch (error) {
      console.error(error);
      return {};
    }
  }
);

interface SetCurrentFormDataAction {
  payload: {
    formID: string;
  };
  type: string;
}

interface PopulatedFormObject {
  title: Scalars["String"];
  pages: Array<Array<FormElement>>;
}

export interface PopulatedForm {
  preview: PopulatedFormObject;
  published: PopulatedFormObject;
}

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    user: {},
    forms: {},
    formElements: {},
    currentFormIndex: 0,
  },
  reducers: {},
  extraReducers: {
    /*
    // @ts-ignore
    [fetchUserData.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    // @ts-ignore
    [fetchFormData.fulfilled]: (state, action) => {
      state.forms = action.payload;
    },
    // @ts-ignore
    [fetchFormElementData.fulfilled]: (state, action) => {
      state.formElements = action.payload;
    },
    */
    // @ts-ignore
    [fetchAllData.fulfilled]: (
      state,
      action: {
        payload: {
          userData: any;
          formData: any;
          formElementData: any;
        };
      }
    ) => {
      state.user = action.payload.userData;
      state.forms = action.payload.formData;
      state.formElements = action.payload.formElementData;
    },
  },
});

export const {} = userDataSlice.actions;

export const userDataSelector = (state): User => {
  return state.userData.user;
};

export const formDataSelector = (state): { [formID: string]: Form } => {
  return state.userData.forms;
};

export const formElementDataSelector = (
  state
): { [formElementID: string]: FormElement } => {
  return state.userData.formElements;
};

export const currentFormIndexSelector = (state): number =>
  state.userData.currentFormIndex;

export default userDataSlice.reducer;
