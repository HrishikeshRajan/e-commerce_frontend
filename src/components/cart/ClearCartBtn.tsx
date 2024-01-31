import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import cart from '@/utils/cart.helper';
import { clearCart } from '@/utils/reduxSlice/cartSlice';
import React from 'react';

function ClearCartBtn() {
  const dispatch = useTypedDispatch();
  const deleteCart = () => {
    cart.clearCart();
    dispatch(clearCart());
  };
  return (
    <button type="button" onClick={() => deleteCart()} className="p-2 text-slate-900 font-base">Clear Cart</button>
  );
}

export default ClearCartBtn;
