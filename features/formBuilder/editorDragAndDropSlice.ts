import { createSlice } from "@reduxjs/toolkit";
import { Coordinate, updateDragPointerCoordinatesAction } from "./types";

export const editorDragAndDropSlice = createSlice({
  name: "editorDragAndDrop",
  initialState: {
    dragPointerCoordinates: { x: 0, y: 0 },
    lastDragPoints: { x: 0, y: 0 },
  },
  reducers: {
    updateDragPointerCoordinates: (
      state,
      action: updateDragPointerCoordinatesAction
    ) => {
      state.dragPointerCoordinates = action.payload;
    },
    updateLastDragPoints: (
      state,
      action: updateDragPointerCoordinatesAction
    ) => {
      state.lastDragPoints = action.payload;
    },
  },
});

export const {
  updateDragPointerCoordinates,
  updateLastDragPoints,
} = editorDragAndDropSlice.actions;

export const dragPointerCoordinatesSelector = (state): Coordinate =>
  state.editorDragAndDrop.dragPointerCoordinates;

export const lastDragPointsSelector = (state): Coordinate =>
  state.editorDragAndDrop.lastDragPoints;

export default editorDragAndDropSlice.reducer;
