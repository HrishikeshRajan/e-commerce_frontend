/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cart } from '../../types/Cart';

interface InitialState {
  cart:Cart
  isQtyDialogueOpen:boolean
}
const initialState:InitialState = {
  cart: {
    products: {},
    grandTotalPrice: 0,
    grandTotalQty: 0,
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
    toggleQtyDialogueBox: (state) => {
      state.isQtyDialogueOpen = !state.isQtyDialogueOpen;
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, toggleQtyDialogueBox } = cartSlice.actions;
