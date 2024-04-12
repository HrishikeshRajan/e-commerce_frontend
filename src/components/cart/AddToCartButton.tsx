/* eslint-disable no-restricted-syntax */
/* eslint-disable security/detect-object-injection */
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { ClientCartItem, Options } from '@/types/Cart';
import cart from '@/utils/cart.helper';
import { addPromo, addToCart } from '@/utils/reduxSlice/cartSlice';
import { isEmpty } from 'lodash';
import React from 'react';
import { HiShoppingBag } from 'react-icons/hi2';
import { Promo } from '@/types/Promo';

function findAllPromos(cartItems:ClientCartItem[]) {
  if (!cartItems.length) return null;
  const arr = new Set<Promo>();
  for (let i = 0; i < cartItems.length; i += 1) {
    const cartItem = cartItems[i];

    for (const cop of cartItem.offers.coupons) {
      arr.add(cop);
    }
  }
  return arr;
}

function AddToCartButton() {
  const singleProduct = useTypedSelector((store) => store.products.singleProduct);
  const color = useTypedSelector((store) => store.products.selectedColor);
  const size = useTypedSelector((store) => store.products.selectedSize);
  const dispatch = useTypedDispatch();
  if (isEmpty(singleProduct)) return;

  const handleAddToCart = () => {
    const options:Options = {
      color: color || singleProduct.product.color,
      size: size || singleProduct.product.sizes[singleProduct.product.sizes.length - 1],

    };
    const cartData = cart.addToCart(singleProduct.product, options, singleProduct.offers);
    if (!cartData) return null;

    dispatch(addToCart(cartData));
    const response = findAllPromos(Object.values(cartData.products));
    if (response) {
      response.forEach((item) => {
        dispatch(addPromo(item));
      });
    }
  };
  return (
    <button
      type="button"
      className="bg-gray-900 flex items-center gap-2 w-full justify-center  xl:justify-start xl:w-4/12 p-3 shadow-sm rounded font-semibold text-white text-base my-4"
      aria-label="add to cart"
      onClick={() => handleAddToCart()}
    >
      <HiShoppingBag />
      ADD TO BAG
    </button>
  );
}

export default AddToCartButton;
