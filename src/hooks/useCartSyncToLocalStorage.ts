import { useEffect } from 'react';
import cart from '@/utils/cart.helper';
import { useTypedDispatch, useTypedSelector } from './user/reduxHooks';

const useCartSyncToLocalStorage = () => {
  const dispatch = useTypedDispatch();
  const usercart = useTypedSelector((store) => store.cart.cart);
  useEffect(() => {
    cart.updateCart(usercart);
  }, [dispatch, usercart]);
};

export default useCartSyncToLocalStorage;
