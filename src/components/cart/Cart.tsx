import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import cart from '@/utils/cart.helper';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { addToCart } from '@/utils/reduxSlice/cartSlice';
import CartItem from './CartItem';
import Summary from './Summary';
import EmptyCart from './EmptyCart';

function Cart() {
  const userCart = useTypedSelector((store) => store.cart.cart);
  const dispatch = useTypedDispatch();
  // Updates to redux on every page refresh 
  useEffect(() => {
    const localCart = cart.get();
    if (localCart) {
      dispatch(addToCart(localCart));
    }
  }, [dispatch]);
  // Refresh the component after deleting items from cart
  // useEffect(() => {
  // }, [userCart]);

  if (!userCart || (isEmpty(userCart.products))) return <EmptyCart />;
  return (
    <div className="lg:container flex justify-evenly lg:flex-row flex-col px-1">
      <CartItem />
      <Summary summary={userCart} />
    </div>
  );
}

export default Cart;
