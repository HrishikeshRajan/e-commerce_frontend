/* eslint-disable no-constant-condition */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { createPortal } from 'react-dom';
import cart from '@/utils/cart.helper';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { addToCart } from '@/utils/reduxSlice/cartSlice';
import { ProductCore } from '@/types/Product';
import { usePageFreeze } from '../../hooks/user/usePageFreeze';
import { updateProductSize } from '../cart/apis/sizeUpdate';

interface IDialougeBox {
  product:ProductCore
  cartId:string
  title:string
  info?:string
  stockAvailable:boolean
  currentSize:string
  close: React.Dispatch<React.SetStateAction<boolean>>
}

function SizeBox({
  title, info, close, product, currentSize, cartId, stockAvailable,
}:IDialougeBox) {
  /**
   * This hook hides the veritical scroll
   */
  usePageFreeze();
  const dispatch = useTypedDispatch();
  const isLoggedIn = useTypedSelector((store) => store.app.authenticated);
  const handleSelectSize = (selectedSize:string) => {
    const updatedCart = cart.updateSize(selectedSize, product._id);
    dispatch(addToCart(updatedCart!));
    if (isLoggedIn && false) {
      updateProductSize(selectedSize, product._id, cartId).then(() => {
      }).catch((error) => console.log(error));
    }
    close(false);
  };
  return createPortal(
    <>
      <div
        role="button"
        aria-label="cancel"
        tabIndex={0}
        className="absolute z-50 inset-0 backdrop-blur-sm"
        onClick={() => close(false)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            close(false);
          }
        }}
      />
      <div className=" w-11/12 lg:w-fit h-fit  z-50 justify-center  border-2 bg-white rounded-xl border-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col  px-2  ">
        <button type="button" className="flex justify-end" aria-label="close" onClick={() => close(false)}>x</button>
        <p className="text-gray-800 text-center py-5 font-semibold text-lg">
          {title}
          <span className="text-bold px-2 text-black">
            {info}
          </span>
        </p>
        <p>
          {stockAvailable && <span className=" w-full flex justify-center font-bold text-red-500">Out of stock</span>}

        </p>
        <div className=" w-full gap-3 p-5 flex flex-wrap justify-start items-center">
          {product.sizes.map((item, index) => (
            <button onClick={() => handleSelectSize(item)} disabled={stockAvailable} type="button" className={` rounded-full hover:bg-slate-200 hover:text-black hover:font-bold text-slate-900  h-10 w-10 text-xs ${currentSize === item ? 'border-2 text-slate-700 border-slate-700' : 'border border-slate-300 text-slate-700'} ${stockAvailable ? 'disabled:bg-slate-100 disabled:text-slate-800 border-dashed cursor-not-allowed' : 'bg-slate-200'} `} key={index}>
              {stockAvailable ? (
                <del>
                  {item}
                </del>
              ) : item}
            </button>
          ))}
        </div>
      </div>
    </>,
    document.getElementById('dialougeBox')!,
  );
}

export default SizeBox;
