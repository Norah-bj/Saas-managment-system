import { createSlice, combineReducers } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  access_token: null,
};

const navInitialState = {
  performance: null,
  recruitment: null,
  payment: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
    },
    logout: (state) => {
      state.user = null;
      state.access_token = null;
    },
  },
});

const navigationSlice = createSlice({
  name: "nav",
  initialState: navInitialState,
  reducers: {
    updatePerformance: (state, action) => {
      state.performance = action.payload.newPerformance;
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export const { updatePerformance } = navigationSlice.actions;

export const authReducer = authSlice.reducer;
export const navReducer = navigationSlice.reducer;