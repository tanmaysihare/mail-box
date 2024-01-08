import { configureStore } from "@reduxjs/toolkit";
import composeReducer from "./compose-slice";
import authReducer from "./Auth-Slice";
import uiReducer from "./ui-slice";

export const store = configureStore({
  reducer: {
    compose: composeReducer,
    auth: authReducer,
    ui: uiReducer,
  },
});
