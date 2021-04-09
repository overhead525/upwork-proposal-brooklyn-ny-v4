import { createSlice } from "@reduxjs/toolkit";
import { Coordinate, updateDragPointerCoordinatesAction } from "./types";

export const editorDragAndDropSlice = createSlice({
  name: "editorDragAndDrop",
  initialState: {
    dragPointerCoordinates: { x: 0, y: 0 },
  },
  reducers: {
    updateDragPointerCoordinates: (
      state,
      action: updateDragPointerCoordinatesAction
    ) => {
      state.dragPointerCoordinates = action.payload;
    },
  },
});

export const { updateDragPointerCoordinates } = editorDragAndDropSlice.actions;

export const dragPointerCoordinatesSelector = (state): Coordinate =>
  state.editorDragAndDrop.dragPointerCoordinates;

export default editorDragAndDropSlice.reducer;
