import { configureStore } from '@reduxjs/toolkit';
import appSlice from './reduxSlice/appSlice';
import markeplaceSlice from './reduxSlice/markeplaceSlice';

const store = configureStore({
  reducer: {
    app: appSlice,
    marketplace: markeplaceSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
