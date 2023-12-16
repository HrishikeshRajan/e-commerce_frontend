/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../components/user';

interface IAPP {
  user:IUser | null,
  authenticated:boolean,
  authPage:boolean,
  sidebarIsOpen:boolean
  doSignout:boolean
}

const initialState:IAPP = {
  user: null,
  authenticated: false,
  authPage: false,
  sidebarIsOpen: false,
  doSignout: false,
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

    upgradeToSeller: (state, action:PayloadAction<boolean>) => {
      const { user } = state;
      if (user) {
        user.seller = action.payload;
        if (user.seller) { user.role = 'seller'; } else { user.role = 'user'; }
      }

      state.user = user;
    },
    toggleSidebar: (state) => {
      state.sidebarIsOpen = !state.sidebarIsOpen;
    },
    toggleSignout: (state) => {
      state.doSignout = !state.doSignout;
    },

  },
});

export const {
  addUser,
  removeUser,
  confirmAuthentication,
  removeAuthentication,
  signInPage,
  upgradeToSeller,
  toggleSidebar,
  toggleSignout
} = appSlice.actions;

export default appSlice.reducer;
