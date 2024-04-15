/* eslint-disable max-len */
/* eslint-disable security/detect-object-injection */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Promo } from '@/types/Promo';
import { merge } from 'lodash';
import {
  ClientCart, ClientCartItem, Flat, Percentage,
} from '../../types/Cart';
import { getGrandTotal } from '../cart.helper';

interface InitialState {
  cart: ClientCart | null;
  isQtyDialogueOpen: boolean;
  promo:Promo[]
  promoError:string
}
const initialState: InitialState = {
  cart: null,
  isQtyDialogueOpen: false,
  promo: [],
  promoError: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ClientCart>) => {
      state.cart = action.payload;
    },
    updateUserIdandCartId: (state, action: PayloadAction<{ userId:string, cartId:string }>) => {
      if (state.cart) {
        state.cart.cartId = action.payload.cartId;
        state.cart.userId = action.payload.userId;
      }
    },
    mergeToCart: (state, action: PayloadAction<ClientCart>) => {
      state.cart = action.payload;
      merge(state.cart, action.payload);
    },
    updateCartItem: (
      state,
      action: PayloadAction<{ productId: string; item: ClientCartItem }>,
    ) => {
      if (state.cart) {
        state.cart.products[action.payload.productId] = action.payload.item;
      }
    },
    updateGrandTotalPrice: (state, action: PayloadAction<number>) => {
      if (state.cart) {
        state.cart.grandTotalPrice = action.payload;
      }
    },
    updateGrandTotalQty: (state, action: PayloadAction<number>) => {
      if (state.cart) {
        state.cart.grandTotalQty = action.payload;
      }
    },
    updateAppliedOffer: (
      state,
      action: PayloadAction<{ productId: string; item: Flat | Percentage }>,
    ) => {
      const { productId, item } = action.payload;
      if (state.cart && state.cart.products[productId]) {
        state.cart.products[productId].appliedOffer = item;
        state.cart.grandTotalPrice = Number(getGrandTotal(state.cart.products));
      }
    },

    clearCart: (state) => {
      state.cart = null;
    },
    toggleQtyDialogueBox: (state) => {
      state.isQtyDialogueOpen = !state.isQtyDialogueOpen;
    },
    addPromo: (state, action:PayloadAction<Promo>) => {
      const index = state.promo.findIndex((item) => item._id === action.payload._id);
      if (index < 0) {
        state.promo.push(action.payload);
      }
    },

    promoError: (state, action:PayloadAction<string>) => {
      state.promoError = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  toggleQtyDialogueBox,
  clearCart,
  updateCartItem,
  updateGrandTotalPrice,
  updateGrandTotalQty,
  updateAppliedOffer,
  addPromo,
  promoError,
  mergeToCart,
  updateUserIdandCartId,
} = cartSlice.actions;
