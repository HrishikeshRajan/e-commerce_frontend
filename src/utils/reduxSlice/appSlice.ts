/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFlashSale } from '@/types/Sale';
import { IUser } from '../../components/user';

enum Screen {
  USER = 'USER',
  SELLER = 'SELLER',
}
interface IAPP {
  user:IUser | null,
  authenticated:boolean,
  authPage:boolean,
  sidebarIsOpen:boolean,
  doSignout:boolean,
  sidebar:boolean,
  screen:Screen,
  flashSaleLive:boolean
  flashSaleItem: IFlashSale | null
}

const initialState:IAPP = {
  user: null,
  authenticated: false,
  authPage: false,
  sidebarIsOpen: false,
  doSignout: false,
  sidebar: false,
  screen: Screen.USER,
  flashSaleLive: false,
  flashSaleItem: null,
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
    toggleUserSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
    setScreen: (state, action:PayloadAction<Screen>) => {
      state.screen = action.payload;
    },
    toggleFlashSale: (state, action:PayloadAction<boolean>) => {
      state.flashSaleLive = action.payload;
    },
    addFlashSaleItem: (state, action:PayloadAction<IFlashSale>) => {
      state.flashSaleItem = action.payload;
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
  toggleSignout,
  toggleUserSidebar,
  setScreen,
  toggleFlashSale,
  addFlashSaleItem,
} = appSlice.actions;

export default appSlice.reducer;
