import React from 'react';
import { HiShoppingBag } from 'react-icons/hi2';

function AddToCartButton() {
  return (
    <button type="button" className="bg-gray-900 flex items-center gap-2  p-3 shadow-sm rounded font-semibold text-white text-base my-4" aria-label="add to cart">
      <HiShoppingBag />
      {' '}
      ADD TO BAG
    </button>
  );
}

export default AddToCartButton;
