import { Cart } from '@/types/Cart';
import React from 'react';
import CartCard from './CartCard';

function CartItem({ myCart }:{ myCart:Cart }) {
  return (
    <div className="w-6/12 lg:mt-40  shadow-md p-3 ">
      <h1 className="text-slate-900 font-bold text-lg py-3">
        Cart Items
        {' '}
        <span className="text-slate-600 font-light">
          (
          {myCart.grandTotalQty}
          )
        </span>
      </h1>
      {Object.entries(myCart.products)
        .map(([id, product]) => <CartCard key={id} cartItem={product} />)}
    </div>
  );
}

export default CartItem;
