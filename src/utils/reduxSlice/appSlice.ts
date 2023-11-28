/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../components/user';
import { accountMenu } from '../../components/user/constants';

interface IAPP {
  user:IUser | null,
  authenticated:boolean | false,
}

const initialState:IAPP = {
  user: null,
  authenticated: false,
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

  },
});

export const {
  addUser,
  removeUser,
  confirmAuthentication,
  removeAuthentication,
} = appSlice.actions;

export default appSlice.reducer;
