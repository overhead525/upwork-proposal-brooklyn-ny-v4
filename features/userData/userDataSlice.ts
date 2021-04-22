import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
    [fetchUserData.fulfilled.toString()]: (state, action) => {
      state.user = action.payload;
    },
    // @ts-ignore
    [fetchFormData.fulfilled.toString()]: (state, action) => {
      state.forms = action.payload;
    },
  },
});

export const {} = userDataSlice.actions;

export default userDataSlice.reducer;
