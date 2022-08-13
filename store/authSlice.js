import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = { authState: false };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.authState = action.payload;
    },
    extraReducers: {
      [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload.auth,
      }),
    },
  },
});

export const { setAuthState } = authSlice.actions;
export const selectAuthState = (state) => state.auth.authState;
export default authSlice.reducer;
