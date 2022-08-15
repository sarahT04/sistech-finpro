import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = { authState: false, token: null };

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
    extraReducers: {
      [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload.auth,
      }),
    },
  },
});

export const { setAuthState, setToken } = authSlice.actions;
export const selectAuthState = (state) => state.auth.authState;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;
