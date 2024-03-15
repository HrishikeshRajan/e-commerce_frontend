import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import cart from '@/utils/cart.helper';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import CartItem from './CartItem';
import Summary from './Summary';
import EmptyCart from './EmptyCart';

function Cart() {
  const reduxCart = useTypedSelector((store) => store.cart.cart);

  // Refresh the component after deleting items from cart
  useEffect(() => {
  }, [reduxCart]);
  const userCart = cart.get();
  if (!userCart || (isEmpty(userCart.products))) return <EmptyCart />;
  return (
    <div className="lg:container flex justify-evenly lg:flex-row flex-col px-1">
      <CartItem myCart={userCart} />
      <Summary summary={userCart} />

    </div>
  );
}

export default Cart;
