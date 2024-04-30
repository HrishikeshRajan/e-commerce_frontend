/* eslint-disable no-constant-condition */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import cart from '@/utils/cart.helper';
import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import {
  updateCartItem, updateCartItemQty, updateGrandTotalPrice, updateGrandTotalQty,
} from '@/utils/reduxSlice/cartSlice';
import { IoIosClose } from 'react-icons/io';
import Modal from './Modal';

interface IDialougeBox {
  productId:string
  qty:number
  stock:number
  close: React.Dispatch<React.SetStateAction<boolean>>
}

function QtyBox({
  qty, close, productId, stock,
}:IDialougeBox) {
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

  return (
    <Modal className="rounded-xl flex flex-col py-10 px-5 " togglerFn={() => close(false)}>
      <button
        aria-label="close modal"
        onClick={() => {
          close(false);
        }}
        className="absolute hover:scale-150 font-bold transition ease-linear top-0 p-2 right-0 "
        type="button"
      >
        <IoIosClose size={20} />
      </button>

      <p className="py-4 text-slate-500 mx-auto text-center font-semibold">Please choose the most suitable size for you.</p>
      <div className=" mx-auto ">
        {stock < qty && <span className=" w-full flex justify-center font-bold text-red-500">Currenlty Unavailable </span>}
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
    </Modal>
  );
}

export default QtyBox;
