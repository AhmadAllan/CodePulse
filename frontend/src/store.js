import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slice/apiSlice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    // Add the reducer from the apiSlice
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // Add the middleware from the apiSlice
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true, // Enable Redux DevTools extension
});

export default store;
