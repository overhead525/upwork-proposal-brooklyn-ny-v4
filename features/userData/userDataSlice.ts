import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, Form, FormElement } from "../../src/generated/graphql";

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

          return { ...(await o), [formElementID]: data };
        },
        {}
      );

      return formElementData;
    } catch (error) {
      console.error(error);
      return {};
    }
  }
);

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    user: {},
    forms: {},
    formElements: {},
  },
  reducers: {},
  extraReducers: {
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
  },
});

export const {} = userDataSlice.actions;

export const userDataSelector = (state): User => {
  return state.userData.user;
};

export const formDataSelector = (state): Form => {
  return state.userData.forms;
};

export const formElementDataSelector = (state): FormElement => {
  return state.userData.formElements;
};

export default userDataSlice.reducer;
