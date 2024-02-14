import { submitCart } from '@/components/cart/apis/addToCart';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { Options } from '@/types/Cart';
import cart from '@/utils/cart.helper';
import { addToCart, addToCartResponse } from '@/utils/reduxSlice/cartSlice';
import { replaceCartProductsWithIds } from '@/utils/replaceCartProductsWithIds';
import { isEmpty } from 'lodash';
import React from 'react';
import { HiShoppingBag } from 'react-icons/hi2';

function AddToCartButton() {
  const item = useTypedSelector((store) => store.products.singleProduct);
  const color = useTypedSelector((store) => store.products.selectedColor);
  const size = useTypedSelector((store) => store.products.selectedSize);
  const dispatch = useTypedDispatch();
  if (isEmpty(item)) return;

  const handleAddToCart = () => {
    const options:Options = {
      color: color || item.color,
      size: size || item.sizes[item.sizes.length - 1],

    };

    const cartData = cart.addToCart(item, options);
    dispatch(addToCart(cartData!));

    const modifiedCart = replaceCartProductsWithIds(cartData!);
    submitCart(modifiedCart).then((result) => {
      if (result) {
        cart.setCartResponse(result.message.cart);
        dispatch(addToCartResponse(result.message.cart));
      }
    });
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
