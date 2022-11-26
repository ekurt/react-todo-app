import { configureStore } from "@reduxjs/toolkit";

import siteReducer from "./site";
import todoReducer from "./todo";
import userReducer from "./user";

export default configureStore({
  reducer: {
    site: siteReducer,
    todo: todoReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
