import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import cart from '@/utils/cart.helper';
import { addToCart } from '@/utils/reduxSlice/cartSlice';
import React from 'react';
import { RxCross2 } from 'react-icons/rx';

function DeleteItemBtn({ productId }:{ productId:string }) {
  const dispatch = useTypedDispatch();
  const deleteCartItem = () => {
    const updatedCart = cart.deleteProductById(productId);
    dispatch(addToCart(updatedCart!));
  };
  return (
    <button type="button" aria-label="Delete Cart Item" onClick={() => deleteCartItem()} className="absolute top-0 right-0 p-2"><RxCross2 /></button>

  );
}

export default DeleteItemBtn;
