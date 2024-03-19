/* eslint-disable react/no-array-index-key */
import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import cart from '@/utils/cart.helper';
import { addProductSize } from '@/utils/reduxSlice/productSlice';
import React from 'react';

function Sizes({ sizes, productId }:{ sizes:string[], productId:string }) {
  const dispatch = useTypedDispatch();
  const handleSize = (size:string) => {
    dispatch(addProductSize(size));
    cart.updateSize(size, productId);
  };
  return (
    <>
      <h4 className="mt-4 font-bold text-slate-800">SELECT SIZE</h4>
      <ul className="flex justify-start gap-4 mb-3 py-2">
        {sizes.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            <input type="radio" name="size" value={item} onChange={(e) => handleSize(e.target.value)} className="w-5 h-5 w accent-black border-white bg-white rounded-lg" />
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Sizes;
