import { configureStore } from "@reduxjs/toolkit";
import formBuilderReducer from "../features/formBuilder/formBuilderSlice";

export default configureStore({
  reducer: {
    formBuilder: formBuilderReducer,
  },
});
