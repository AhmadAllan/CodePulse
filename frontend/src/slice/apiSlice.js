import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// Create a base query using fetchBaseQuery and provide the base URL
const baseQuery = fetchBaseQuery({ baseUrl: '' });

// Create an API slice using createApi
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'], // Define tag types (optional)
  endpoints: (builder) => ({}), // Define endpoints (empty for now)
});
