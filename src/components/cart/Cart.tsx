import React, { useEffect, useMemo } from 'react';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import cart from '@/utils/cart.helper';
import CartItem from './CartItem';
import Summary from './Summary';

function Cart() {
  const cartstore = useTypedSelector((store) => store.cart.cart);
  const userCart = useMemo(() => cart.get(), [cartstore]);
  return (
    <div className="container flex justify-center ">
      <CartItem myCart={userCart!} />
      <Summary summary={userCart!} />
    </div>
  );
}

export default Cart;
