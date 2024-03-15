/* eslint-disable no-constant-condition */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import cart from '@/utils/cart.helper';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { addToCart } from '@/utils/reduxSlice/cartSlice';
import { usePageFreeze } from '../../hooks/user/usePageFreeze';
import { updateCartQty } from '../cart/apis/quantityUpdate';

interface IDialougeBox {
  productId:string
  cartId:string
  title:string
  info?:string
  qty:number
  stock:number
  close: React.Dispatch<React.SetStateAction<boolean>>
}

function QtyBox({
  title, info, qty, close, productId, cartId, stock,
}:IDialougeBox) {
  /**
   * This hook hides the veritical scroll
   */
  usePageFreeze();

  const [stockOver, setStockOver] = useState(() => {
    if (stock < qty) {
      return true;
    }
    return false;
  });
  const dispatch = useTypedDispatch();
  const isLoggedIn = useTypedSelector((store) => store.app.authenticated);

  const handleQty = (selectedQty:number) => {
    const updatedCart = cart.updateQty(selectedQty, productId);
    if (!updateCartQty) {
      return setStockOver(true);
    }
    dispatch(addToCart(updatedCart!));
    if (isLoggedIn && false) {
      updateCartQty(selectedQty, productId, cartId).then(() => {

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
      <div
        className="w-11/12 lg:w-fit h-fit z-50 justify-center border-2 bg-white rounded-xl border-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col px-2"
        role="alertdialog"
      >
        <button type="button" className="flex justify-end" aria-label="close" onClick={() => close(false)}>x</button>
        <p className="text-gray-800 text-center py-5 font-semibold text-lg">
          {title}
          <span className="text-bold px-2 text-black">{info}</span>
        </p>
        <p>
          {stock < qty && <span className=" w-full flex justify-center font-bold text-red-500">Out of stock</span>}

        </p>
        <div className=" w-full gap-3   p-5 flex flex-wrap justify-start items-center">
          {Array.from({ length: 10 }).map((_, index) => (
            <button type="button" disabled={stockOver} onClick={() => handleQty(index + 1)} className={` rounded-full hover:bg-slate-200 hover:text-black hover:font-bold  h-10 w-10 text-xs ${qty === index + 1 ? 'border-2 text-slate-700 border-slate-700' : 'border border-slate-300 text-slate-700'} ${stockOver ? 'disabled:bg-slate-100 disabled:text-slate-800 border-dashed cursor-not-allowed' : 'bg-slate-200'} `} key={index}>
              {stockOver ? (
                <del>
                  {index + 1}
                </del>
              ) : index + 1}
            </button>
          ))}
        </div>
      </div>
    </>,
    document.getElementById('dialougeBox')!,
  );
}

export default QtyBox;
