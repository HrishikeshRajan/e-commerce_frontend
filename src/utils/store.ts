import { configureStore } from '@reduxjs/toolkit';
import appSlice from './reduxSlice/appSlice';
import markeplaceSlice from './reduxSlice/markeplaceSlice';
import productSlice from './reduxSlice/productSlice';
import cartSlice from './reduxSlice/cartSlice';
import orderSlice from './reduxSlice/orderSlice';

const store = configureStore({
  reducer: {
    app: appSlice,
    marketplace: markeplaceSlice,
    products: productSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
