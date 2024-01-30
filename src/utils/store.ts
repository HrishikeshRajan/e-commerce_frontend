import { configureStore } from '@reduxjs/toolkit';
import appSlice from './reduxSlice/appSlice';
import markeplaceSlice from './reduxSlice/markeplaceSlice';
import productSlice from './reduxSlice/productSlice';
import cartSlice from './reduxSlice/cartSlice';

const store = configureStore({
  reducer: {
    app: appSlice,
    marketplace: markeplaceSlice,
    products: productSlice,
    cart: cartSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
