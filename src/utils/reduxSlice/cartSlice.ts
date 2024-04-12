/* eslint-disable max-len */
/* eslint-disable security/detect-object-injection */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Promo } from '@/types/Promo';
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
    promoUsedCount: (
      state,
      action: PayloadAction<{
        userId:string,
        promoId:string
      }>,
    ) => {
      if (state.cart) {
        const index = state.promo.findIndex((item) => item._id.toString() === action.payload.promoId.toString());
        if (index > -1) {
          const userIndex = state.promo[index].usedBy.findIndex((usedUser) => usedUser.userId === action.payload.userId);
          if (userIndex < 0) {
            state.promo[index].usedBy.push({ count: 1, userId: action.payload.userId });
          }
        }
      }
    },
    updateUsedCount: (
      state,
      action: PayloadAction<{
        code: string,
        productId:string,
        userId:string,
        couponIndex:number,
        count:number,
        usedUserIndex:number
      }>,
    ) => {
      if (state.cart && state.cart.products[action.payload.productId] && state.cart.products[action.payload.productId].offers) {
        state.cart.products[action.payload.productId].offers.coupons[action.payload.couponIndex].usedBy[action.payload.usedUserIndex].count = action.payload.count;
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
  promoUsedCount,
  updateUsedCount,
  addPromo,
  promoError,
} = cartSlice.actions;
