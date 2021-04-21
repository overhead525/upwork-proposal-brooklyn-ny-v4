import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk(
  "userData/fetchUserData",
  async (username: string, thunkAPI) => {
    const query = `
      query GetUser($usrnm: String!) {
        getUser(username: $usrnm) {
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

    const response = await fetch("http://localhost:3000/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { usrnm: username },
      }),
    });

    const parsed = await response.json();
    return parsed.data.getUser;
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
  },
});

export const {} = userDataSlice.actions;

export default userDataSlice.reducer;
