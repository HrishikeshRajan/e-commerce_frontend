import React from 'react';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import cart from '@/utils/cart.helper';
import { isEmpty } from 'lodash';
import CartItem from './CartItem';
import Summary from './Summary';

function Cart() {
  const userCart = useTypedSelector((store) => store.cart.cart);
  const localCart = cart.get();

  return (
    <div className="container flex justify-center ">
      <CartItem myCart={userCart && !isEmpty(userCart.products) ? userCart : localCart!} />
      <Summary summary={userCart && !isEmpty(userCart.products) ? userCart : localCart!} />
    </div>
  );
}

export default Cart;
