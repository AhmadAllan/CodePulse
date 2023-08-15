import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import defaultProjectReducer from "./slices/defaultProjectSlice";

// Configure the Redux store
const store = configureStore({
  reducer: {
    // Add the reducer from the apiSlice

    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    defaultProject: defaultProjectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    // Add the middleware from the apiSlice
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true, // Enable Redux DevTools extension
});

export default store;