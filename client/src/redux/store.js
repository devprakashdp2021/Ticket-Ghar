import { configureStore } from "@reduxjs/toolkit";
import loadersReducer from "./loadersSlice";
import usersReducers from "./usersSlice";

const store = configureStore({
  reducer: {
    loaders: loadersReducer,
    users: usersReducers,
  },
});
export default store;
