import { configureStore } from "@reduxjs/toolkit";
import formBuilderReducer from "../features/formBuilder/formBuilderSlice";
import formDisplayReducer from "../features/formDisplay/formDisplaySlice";

export default configureStore({
  reducer: {
    formBuilder: formBuilderReducer,
    formDisplay: formDisplayReducer,
  },
});
