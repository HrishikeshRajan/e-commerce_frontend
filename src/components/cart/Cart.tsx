import React from 'react';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import CartItem from './CartItem';
import Summary from './Summary';

function Cart() {
  const userCart = useTypedSelector((store) => store.cart.cart);
  return (
    <div className="container flex justify-center ">
      <CartItem myCart={userCart!} />
      <Summary summary={userCart!} />
    </div>
  );
}

export default Cart;
