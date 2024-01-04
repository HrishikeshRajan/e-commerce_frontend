/* eslint-disable no-param-reassign */
import { IUser } from '@/components/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CloudinaryImage { id: string, secure_url: string, url: string }
export interface ShopCore {
  _id:string
  name: string
  logo: CloudinaryImage
  description: string
  reviews:[]
  address:string
  owner: IUser
  email:string
  created:string
}
interface IAPP {
  currentTab:number
  authenticated:boolean | false
  authPage:boolean | false
  shop:{
    logo:string
    shops:ShopCore[]
    currentShop:ShopCore
  }
  productImages:string[]
}

const initialState:IAPP = {
  currentTab: 1,
  authenticated: false,
  authPage: false,
  shop: {
    logo: '',
    shops: [],
    currentShop: {
      _id: '',
      name: '',
      logo: { id: '', secure_url: '', url: '' },
      description: '',
      reviews: [],
      address: '',
      owner: {
        _id: '',
        fullname: '',
        username: '',
        email: '',
        seller: false,
        role: '',
      },
      email: '',
      created: '',
    },
  },
  productImages: [],
};

const marketplaceSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    confirmAuthentication: (state, action:PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
    removeAuthentication: (state) => {
      state.authenticated = false;
    },
    signInPage: (state, action:PayloadAction<boolean>) => {
      state.authPage = action.payload;
    },
    setCurrentTab: (state, action:PayloadAction<number>) => {
      state.currentTab = action.payload;
    },
    setShopLogo: (state, action:PayloadAction<string>) => {
      state.shop.logo = action.payload;
    },

    addShops: (state, action:PayloadAction<ShopCore[]>) => {
      state.shop.shops = action.payload;
    },
    addShop: (state, action:PayloadAction<ShopCore>) => {
      state.shop.currentShop = action.payload;
    },

    clearShop: (state) => {
      state.shop = {
        logo: '',
        shops: [],
        currentShop: {
          _id: '',
          name: '',
          logo: { id: '', secure_url: '', url: '' },
          description: '',
          reviews: [],
          address: '',
          owner: {
            _id: '',
            fullname: '',
            username: '',
            email: '',
            seller: false,
            role: '',
          },
          email: '',
          created: '',
        },
      };
    },
    addProductImages: (state, action:PayloadAction<string>) => {
      state.productImages.push(action.payload);
    },
    clearProductImages: (state) => {
      state.productImages = [];
    },
  },
});

export const {

  confirmAuthentication,
  removeAuthentication,
  signInPage,
  setCurrentTab,
  setShopLogo,
  addShops,
  addShop,
  clearShop,
  addProductImages,
  clearProductImages,
} = marketplaceSlice.actions;

export default marketplaceSlice.reducer;
