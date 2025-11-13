import { configureStore } from '@reduxjs/toolkit';
import {authReducer, navReducer } from './features/authSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    nav: navReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;