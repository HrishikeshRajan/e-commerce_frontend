/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cart } from '../../types/Cart';

interface InitialState {
  cart:Cart
}
const initialState:InitialState = {
  cart: {
    products: {},
    grandTotalPrice: 0,
    grandTotalQty: 0,
  },
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action:PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
