import { configureStore } from "@reduxjs/toolkit";

import siteReducer from "./site";
import todoReducer from "./todo";

export default configureStore({
  reducer: {
    site: siteReducer,
    todo: todoReducer,
  },
});
