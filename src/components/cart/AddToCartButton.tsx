import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { Options } from '@/types/Cart';
import cart from '@/utils/cart.helper';
import { addToCart } from '@/utils/reduxSlice/cartSlice';
import { isEmpty } from 'lodash';
import React from 'react';
import { HiShoppingBag } from 'react-icons/hi2';

function AddToCartButton() {
  const singleProduct = useTypedSelector((store) => store.products.singleProduct);
  const color = useTypedSelector((store) => store.products.selectedColor);
  const size = useTypedSelector((store) => store.products.selectedSize);
  const dispatch = useTypedDispatch();
  if (isEmpty(singleProduct)) return;

  const handleAddToCart = () => {
    const options:Options = {
      color: color || singleProduct.color,
      size: size || singleProduct.sizes[singleProduct.sizes.length - 1],

    };
    const cartData = cart.addToCart(singleProduct, options);
    if (!cartData) return null;
    dispatch(addToCart(cartData!));
  };
  return (
    <button
      type="button"
      className="bg-gray-900 flex items-center gap-2  p-3 shadow-sm rounded font-semibold text-white text-base my-4"
      aria-label="add to cart"
      onClick={() => handleAddToCart()}
    >
      <HiShoppingBag />
      {' '}
      ADD TO BAG
    </button>
  );
}

export default AddToCartButton;
