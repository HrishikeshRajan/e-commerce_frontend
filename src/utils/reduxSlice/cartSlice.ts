/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable security/detect-object-injection */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Promo } from '@/types/Promo';
import { merge } from 'lodash';
import currency from 'currency.js';
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
    updateCartItemSize: (
      state,
      action: PayloadAction<{ productId: string; size: string }>,
    ) => {
      if (state.cart) {
        state.cart.products[action.payload.productId].options.size = action.payload.size;
      }
    },
    updateCartItemColor: (
      state,
      action: PayloadAction<{ productId: string; color: string }>,
    ) => {
      if (state.cart) {
        state.cart.products[action.payload.productId].options.color = action.payload.color;
      }
    },
    updateCartItemQty: (
      state,
      action: PayloadAction<{ productId: string; qty:number }>,
    ) => {
      if (state.cart) {
        state.cart.products[action.payload.productId].qty = action.payload.qty;
      }
    },
    incrementCartItemQty: (
      state,
      action: PayloadAction<{ productId: string; color: string }>,
    ) => {
      if (state.cart) {
        state.cart.products[action.payload.productId].qty += 1;
      }
    },
    decrementCartItemQty: (
      state,
      action: PayloadAction<{ productId: string; color: string }>,
    ) => {
      if (state.cart) {
        state.cart.products[action.payload.productId].qty -= 1;
      }
    },
    updateGrandTotalPrice: (state) => {
      if (state.cart) {
        const productsArray = Object.values(state.cart.products);
        let total = 0;
        for (const item of productsArray) {
          if (item.appliedOffer?.couponId) {
            total = currency(total).add(item.appliedOffer.discountedPriceAftTax).value;
          } else {
            total = currency(total).add(item.totalPriceAfterTax).value;
          }
        }
        state.cart.grandTotalPrice = Math.round(total);
      }
    },
    updateGrandTotalQty: (state) => {
      if (state.cart) {
        const grandTotal = Object.values(state.cart.products).reduce((total, item) => total + item.qty, 0);
        state.cart.grandTotalQty = grandTotal;
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
    resetCart: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  toggleQtyDialogueBox,
  clearCart,
  updateCartItem,
  updateCartItemColor,
  updateCartItemSize,
  updateCartItemQty,
  updateGrandTotalPrice,
  updateGrandTotalQty,
  updateAppliedOffer,
  addPromo,
  promoError,
  mergeToCart,
  updateUserIdandCartId,
  resetCart,
} = cartSlice.actions;
