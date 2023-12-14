import { clearShop } from '@/utils/reduxSlice/markeplaceSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Clears the redux shop state and keep the store from holding unneccessary data
const useClearShop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearShop());
  }, []);
};

export default useClearShop;
