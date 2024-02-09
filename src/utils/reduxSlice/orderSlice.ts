/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialState {
  orderId:string
  addressId:string
}
const initialState:InitialState = {
  orderId: '',
  addressId:''
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
  },
});

export default orderSlice.reducer;
export const { addOrderId, addAddressId } = orderSlice.actions;
