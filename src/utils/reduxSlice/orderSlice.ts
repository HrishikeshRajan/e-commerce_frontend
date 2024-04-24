/* eslint-disable no-param-reassign */
import { Address, ClientOrder, FinalOrder } from '@/types/Orders';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialState {
  orderId:string
  addressId:string
  myOrders:FinalOrder[]
  order:Partial<ClientOrder> | null
}
const initialState:InitialState = {
  orderId: '',
  addressId: '',
  myOrders: [],
  order: null,
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
    createOrder: (state, action:PayloadAction<{ order:Partial<ClientOrder> }>) => {
      state.order = action.payload.order;
    },
    setShippingAdress: (state, action:PayloadAction<{ address:Address }>) => {
      if (state.order) {
        state.order.shippingAddress = action.payload.address;
      }
    },
    resetOrders: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export default orderSlice.reducer;
export const {
  addOrderId,
  addAddressId,
  clearAddressId,
  clearOrderId,
  addMyOrders,
  resetOrders,
  createOrder,
  setShippingAdress,
} = orderSlice.actions;
