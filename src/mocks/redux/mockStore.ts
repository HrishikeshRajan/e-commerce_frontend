import { combineReducers, configureStore } from '@reduxjs/toolkit';

import appReducer from '../../utils/reduxSlice/appSlice';

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  user: appReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => configureStore({
  reducer: rootReducer,
  preloadedState,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
