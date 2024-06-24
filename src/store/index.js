import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import serachBarReducer from "./handleSerachBar";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    searchBar: serachBarReducer,
  },
});
