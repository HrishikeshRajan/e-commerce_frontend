/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientFlashSale } from '@/types/Sale';
import { IUser } from '../../components/user';

enum Screen {
  USER = 'USER',
  SELLER = 'SELLER',
}
interface IAPP {
  user:IUser | null;
  authenticated:boolean;
  authPage:boolean;
  sidebarIsOpen:boolean;
  doSignout:boolean;
  sidebar:boolean;
  screen:Screen;
  flashSaleItem: ClientFlashSale | null;
  modal:boolean;
  marketSidebar:boolean;
}

const initialState:IAPP = {
  user: null,
  authenticated: false,
  authPage: false,
  sidebarIsOpen: false,
  doSignout: false,
  sidebar: false,
  screen: Screen.USER,
  flashSaleItem: null,
  modal: false,
  marketSidebar: false,
};
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addUser: (state, action:PayloadAction<IUser | null>) => {
      if (action.payload) {
        state.user = action.payload;
      }
    },
    confirmAuthentication: (state, action:PayloadAction<boolean>) => {
      state.authenticated = action.payload;
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
    toggleSidebarMarketplace: (state) => {
      state.marketSidebar = !state.marketSidebar;
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
    addFlashSaleItem: (state, action:PayloadAction<ClientFlashSale>) => {
      state.flashSaleItem = action.payload;
    },
    toggleModal: (state) => {
      state.modal = !state.modal;
    },
    resetUser: (state) => {
      Object.assign(state, initialState);
    },

  },
});

export const {
  addUser,
  confirmAuthentication,
  signInPage,
  upgradeToSeller,
  toggleSidebar,
  toggleSignout,
  toggleUserSidebar,
  setScreen,
  addFlashSaleItem,
  toggleModal,
  toggleSidebarMarketplace,
  resetUser,
} = appSlice.actions;

export default appSlice.reducer;
