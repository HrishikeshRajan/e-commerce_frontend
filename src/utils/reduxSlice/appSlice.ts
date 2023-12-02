/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../components/user';

interface IAPP {
  user:IUser | null,
  authenticated:boolean | false,
  authPage:boolean | false
}

const initialState:IAPP = {
  user: null,
  authenticated: false,
  authPage: false,
};
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addUser: (state, action:PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    confirmAuthentication: (state, action:PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
    removeAuthentication: (state) => {
      state.authenticated = false;
    },
    signInPage: (state, action:PayloadAction<boolean>) => {
      state.authPage = action.payload;
    },

  },
});

export const {
  addUser,
  removeUser,
  confirmAuthentication,
  removeAuthentication,
  signInPage,
} = appSlice.actions;

export default appSlice.reducer;
