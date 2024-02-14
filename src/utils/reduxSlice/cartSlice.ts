/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cart, CartDocument } from '../../types/Cart';

interface InitialState {
  cart:Cart
  cartResponse:CartDocument
  isQtyDialogueOpen:boolean
}
const initialState:InitialState = {
  cart: {
    products: {},
    grandTotalPrice: 0,
    grandTotalQty: 0,
    cartId: '',
    userId: '',
  },
  cartResponse: {
    userId: '',
    products: null,
    grandTotalPrice: 0,
    grandTotalPriceString: '',
    grandTotalQty: 0,
    cartId: '',
    _id: '',
    updatedAt: '',
  },
  isQtyDialogueOpen: false,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action:PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
    addToCartResponse: (state, action:PayloadAction<CartDocument>) => {
      state.cartResponse = action.payload;
    },
    clearCart: (state) => {
      state.cart = {
        products: {},
        grandTotalPrice: 0,
        grandTotalQty: 0,
      };
    },
    clearCartResponse: (state) => {
      state.cartResponse = {
        userId: '',
        products: null,
        grandTotalPrice: 0,
        grandTotalPriceString: '',
        grandTotalQty: 0,
        cartId: '',
        _id: '',
        updatedAt: '',
      };
    },
    toggleQtyDialogueBox: (state) => {
      state.isQtyDialogueOpen = !state.isQtyDialogueOpen;
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart, addToCartResponse, toggleQtyDialogueBox, clearCart, clearCartResponse,
} = cartSlice.actions;
