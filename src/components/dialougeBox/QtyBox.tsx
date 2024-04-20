/* eslint-disable no-constant-condition */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { createPortal } from 'react-dom';
import cart from '@/utils/cart.helper';
import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import {
  updateCartItem, updateCartItemQty, updateGrandTotalPrice, updateGrandTotalQty,
} from '@/utils/reduxSlice/cartSlice';
import { usePageFreeze } from '../../hooks/user/usePageFreeze';

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
  title, info, qty, close, productId, stock,
}:IDialougeBox) {
  /**
   * This hook hides the veritical scroll
   */
  usePageFreeze();

  const dispatch = useTypedDispatch();
  const handleQty = (selectedQty:number) => {
    dispatch(updateCartItemQty({ productId, qty: selectedQty }));
    const updatedCartItem = cart.updateQty(selectedQty, productId);
    if (!updatedCartItem) return;
    dispatch(updateCartItem({ productId, item: updatedCartItem }));
    dispatch(updateGrandTotalQty());
    dispatch(updateGrandTotalPrice());
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
          {stock < qty && <span className=" w-full flex justify-center font-bold text-red-500">Currenlty Unavailable </span>}

        </p>
        <div className=" w-full gap-3   p-5 flex flex-wrap justify-start items-center">
          {Array.from({ length: 10 }).map((_, index) => (
            <button type="button" disabled={index + 1 > stock} onClick={() => handleQty(index + 1)} className={` rounded-full hover:bg-slate-200 hover:text-black hover:font-bold  h-10 w-10 text-xs ${qty === index + 1 ? 'border-2 text-slate-700 border-slate-700' : 'border border-slate-300 text-slate-700'} ${index + 1 > stock ? 'bg-slate-50  border-dashed border-4 cursor-not-allowed' : 'bg-slate-200'} `} key={index}>
              {index + 1 > stock ? (
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
