import { Cart } from '@/types/Cart';
import React from 'react';
import { isEmpty } from 'lodash';
import CartCard from './CartCard';
import ClearCartBtn from './ClearCartBtn';

function CartItem({ myCart }:{ myCart:Cart }) {
  return (
    <div className="w-6/12 lg:mt-40  shadow-md p-3 ">
      <div className="flex w-full justify-between">
        <h1 className="text-slate-900 font-bold text-lg py-3">
          Cart Items
          {' '}
          <span className="text-slate-600 font-light">
            (
            {myCart.grandTotalQty}
            )
          </span>
        </h1>
        <ClearCartBtn />
      </div>
      { !isEmpty(myCart.products) && Object.entries(myCart.products)
        .map(([id, product]) => <CartCard key={id} cartItem={product} />)}
      {isEmpty(myCart.products) && <p className="py-3 text-center text-lg font-semibold text-slate-400">Cart is empty</p>}
    </div>
  );
}

export default CartItem;
