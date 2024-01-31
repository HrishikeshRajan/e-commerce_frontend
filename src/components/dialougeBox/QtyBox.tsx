/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { createPortal } from 'react-dom';
import cart from '@/utils/cart.helper';
import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import { addToCart } from '@/utils/reduxSlice/cartSlice';
import { usePageFreeze } from '../../hooks/user/usePageFreeze';

interface IDialougeBox {
  productId:string
  title:string
  info?:string
  qty:number
  close: React.Dispatch<React.SetStateAction<boolean>>
}

function QtyBox({
  title, info, qty, close, productId,
}:IDialougeBox) {
  /**
   * This hook hides the veritical scroll
   */
  usePageFreeze();

  const dispacth = useTypedDispatch();
  const handleQty = (selectedQty:number) => {
    const updatedCart = cart.updateQty(selectedQty, productId);
    dispacth(addToCart(updatedCart!));
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
      <div className=" w-fit h-fit  z-50 justify-center  border-2 bg-white rounded border-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col  px-2  ">
        <p className="text-gray-800 text-center py-5 font-semibold text-lg">
          {title}
          <span className="text-bold px-2 text-black">{info}</span>
        </p>
        <div className=" w-full gap-3   p-5 flex flex-wrap justify-start items-center">
          {Array.from({ length: 10 }).map((_, index) => <button type="button" onClick={() => handleQty(index + 1)} className={` rounded-full h-10 w-10 text-xs ${qty === index + 1 ? 'border-2 text-slate-700 border-slate-700' : 'border border-slate-300 text-slate-700'}`} key={index}>{index + 1}</button>)}
        </div>
      </div>
    </>,
    document.getElementById('dialougeBox')!,
  );
}

export default QtyBox;
