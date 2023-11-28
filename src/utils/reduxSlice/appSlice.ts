/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../components/user';

interface IAPP {
  user:IUser | null,
  authenticated:boolean | false,
}

const initialState:IAPP = {
  user: null,
  authenticated: false,
};
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addUser: (state, action:PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { addUser } = appSlice.actions;

export default appSlice.reducer;
