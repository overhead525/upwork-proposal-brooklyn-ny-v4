import { createSlice } from "@reduxjs/toolkit";
import { actionButtons, tabs } from "./defaults";

export const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState: {
    actionButtons: actionButtons,
    tabs: tabs,
  },
  reducers: {},
});

export const {} = formBuilderSlice.actions;

export const actionButtonsSelector = (state) => state.formBuilder.actionButtons;
export const tabsSelector = (state) => state.formBuilder.tabs;

export default formBuilderSlice.reducer;
