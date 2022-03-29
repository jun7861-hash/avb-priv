import { combineReducers } from "@reduxjs/toolkit";

import viewReducer, { name as viewName } from "store/slices/view";
import commentReducer, { name as commentName } from "store/slices/comment";

const rootReducer = combineReducers({
  [viewName]: viewReducer,
  [commentName]: commentReducer,
});

export default rootReducer;
