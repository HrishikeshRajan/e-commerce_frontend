import React from 'react';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import cart from '@/utils/cart.helper';
import { isEmpty } from 'lodash';
import CartItem from './CartItem';
import Summary from './Summary';
import EmptyCart from './EmptyCart';

function Cart() {
  const userCart = useTypedSelector((store) => store.cart.cartResponse);
  const localCart = cart.getResponse();
  if ((!localCart || (localCart && isEmpty(localCart.products)))) return <EmptyCart />;
  return (
    <div className="lg:container flex justify-evenly lg:flex-row flex-col px-1">
      <CartItem myCart={userCart && !isEmpty(userCart.products) ? userCart : localCart!} />

      <Summary summary={userCart && !isEmpty(userCart.products) ? userCart : localCart!} />

    </div>
  );
}

export default Cart;
