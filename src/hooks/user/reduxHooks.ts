import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

import { RootState, type AppDispatch } from '../../utils/store';

// Use this instead of useSelector and useDispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch:() => AppDispatch = useDispatch;
