/* eslint-disable max-len */
import { ClientCart } from '@/types/Cart';
import React from 'react';
import { isEmpty } from 'lodash';
import CartCard from './CartCard';
import ClearCartBtn from './ClearCartBtn';

function CartItem({ myCart }:{ myCart:ClientCart }) {
  return (
    <div className="lg:w-5/12 w-full mt-32 md:mt-40 lg:mt-32 shadow-sm  rounded ">
      <div className="flex w-full justify-between">
        <h1 className="text-slate-900 font-bold text-lg py-3">
          Cart Items
          <span className="text-slate-600 font-light">
            (
            {myCart && myCart.grandTotalQty}
            )
          </span>
        </h1>
        <div className="flex gap-2">
          {myCart && !isEmpty(myCart.products) && <ClearCartBtn cartId={myCart.cartId} />}
        </div>
      </div>
      { myCart && myCart.products && !isEmpty(myCart.products) && Object.entries(myCart.products)
        .map(([id, product]) => <CartCard key={id} cartItem={product} cartId={myCart.cartId} />)}

    </div>
  );
}

export default CartItem;
