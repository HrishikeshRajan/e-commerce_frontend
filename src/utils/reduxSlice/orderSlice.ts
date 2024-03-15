/* eslint-disable no-param-reassign */
import { FinalOrder } from '@/types/Orders';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialState {
  orderId:string
  addressId:string
  myOrders:FinalOrder[]
}
const initialState:InitialState = {
  orderId: '',
  addressId: '',
  myOrders: [],
};
const orderSlice = createSlice({
  initialState,
  name: 'order',
  reducers: {
    addOrderId: (state, action:PayloadAction<string>) => {
      state.orderId = action.payload;
    },
    addAddressId: (state, action:PayloadAction<string>) => {
      state.addressId = action.payload;
    },
    clearOrderId: (state) => {
      state.orderId = '';
    },
    clearAddressId: (state) => {
      state.addressId = '';
    },
    addMyOrders: (state, action:PayloadAction<FinalOrder[]>) => {
      state.myOrders = action.payload;
    },
  },
});

export default orderSlice.reducer;
export const {
  addOrderId, addAddressId, clearAddressId, clearOrderId, addMyOrders,
} = orderSlice.actions;
