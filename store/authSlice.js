import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  authState: false, token: null, admin: false, categories: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.authState = action.payload;
    },
    setToken(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.token = action.payload;
    },
    setAdminState(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.admin = action.payload;
    },
    setCategoriesState(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.categories = action.payload;
    },
    extraReducers: {
      [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload.auth,
      }),
    },
  },
});

export const {
  setAuthState, setToken, setAdminState, setCategoriesState,
} = authSlice.actions;
export const selectAuthState = (state) => state.auth.authState;
export const selectToken = (state) => state.auth.token;
export const selectAdminState = (state) => state.auth.admin;
export const selectCategoriesState = (state) => state.auth.categories;
export default authSlice.reducer;
