import { createSlice } from "@reduxjs/toolkit";
import { actionButtons, elements, tabs } from "./defaults";

export const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState: {
    actionButtons: actionButtons,
    tabs: tabs,
    elements: elements,
  },
  reducers: {},
});

export const {} = formBuilderSlice.actions;

export const actionButtonsSelector = (state) => state.formBuilder.actionButtons;
export const tabsSelector = (state) => state.formBuilder.tabs;
export const elementsSelector = (state) => state.formBuilder.elements;

export default formBuilderSlice.reducer;
