import { createSlice } from "@reduxjs/toolkit";

export interface OverviewState {
  questionDetailView: boolean;
}

export const overviewSlice = createSlice({
  name: "overview",
  initialState: {
    questionDetailView: false,
  },
  reducers: {
    toggleQuestionDetailView: (state, action) => {
      state.questionDetailView = !state.questionDetailView;
    },
    resetQuestionDetailView: (state, action) => {
      state.questionDetailView = false;
    },
  },
});

export const {} = overviewSlice.actions;

export const questionDetailViewSelector = (state: {
  overview: OverviewState;
}) => state.overview.questionDetailView;

export default overviewSlice.reducer;
