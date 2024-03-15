/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ClientCart } from '../../types/Cart';

interface InitialState {
  cart:ClientCart
  cartResponse:ClientCart
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
    products: {},
    grandTotalPrice: 0,
    grandTotalQty: 0,
    cartId: '',
  },
  isQtyDialogueOpen: false,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action:PayloadAction<ClientCart>) => {
      state.cart = action.payload;
    },
    addToCartResponse: (state, action:PayloadAction<ClientCart>) => {
      state.cartResponse = action.payload;
    },
    clearCart: (state) => {
      state.cart = {
        products: {},
        grandTotalPrice: 0,
        grandTotalQty: 0,
        userId: '',
        cartId: '',
      };
    },
    clearCartResponse: (state) => {
      state.cartResponse = {
        userId: '',
        products: {},
        grandTotalPrice: 0,
        grandTotalQty: 0,
        cartId: '',
      };
    },
    toggleQtyDialogueBox: (state) => {
      state.isQtyDialogueOpen = !state.isQtyDialogueOpen;
    },

    updateCartAndUserId: (state, action:PayloadAction<{ userId:string, cartId:string }>) => {
      state.cart.cartId = action.payload.cartId;
      state.cart.userId = action.payload.userId;
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  addToCartResponse,
  toggleQtyDialogueBox,
  clearCart,
  clearCartResponse,
  updateCartAndUserId,
} = cartSlice.actions;
