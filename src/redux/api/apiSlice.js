import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl:"http://locahost:8080",
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access_token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({
    
  }),
});

export const {

} = apiSlice;