import { createSlice } from "@reduxjs/toolkit";
import { FormElement } from "../../src/generated/graphql";

const fdInitialState: FormElement[] = [];

interface addElementAction {
  payload: FormElement;
  type: string;
}

export const formDisplaySlice = createSlice({
  name: "formDisplay",
  initialState: {
    elements: fdInitialState,
  },
  reducers: {
    addElement: (state, action: addElementAction) => {
      state.elements.push(action.payload);
    },
    deleteElement: (state, action: addElementAction) => {
      state.elements = state.elements.filter((el) => {
        return el.question === action.payload.question;
      });
    },
  },
});

export const { addElement, deleteElement } = formDisplaySlice.actions;

export const elementsSelector = (state): FormElement[] =>
  state.formDisplay.elements;

export default formDisplaySlice.reducer;
