/* eslint-disable no-constant-condition */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import { updateCartItemSize } from '@/utils/reduxSlice/cartSlice';
import { ProductCore } from '@/types/Product';
import { IoIosClose } from 'react-icons/io';
import { TbRulerMeasure } from 'react-icons/tb';
import Modal from './Modal';

interface IDialougeBox {
  product:ProductCore
  stockAvailable:boolean
  currentSize:string
  close: React.Dispatch<React.SetStateAction<boolean>>
}

function SizeBox({
  close, product, currentSize, stockAvailable,
}:IDialougeBox) {
  const dispatch = useTypedDispatch();
  const handleSelectSize = (selectedSize:string) => {
    dispatch(updateCartItemSize({ productId: product._id, size: selectedSize }));
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
      <TbRulerMeasure size={42} className="text-slate-400 mx-auto" />
      <p className="py-4 text-slate-500 mx-auto text-center font-semibold">Please choose the most suitable size for you.</p>
      <div className=" mx-auto ">
        <p>
          {stockAvailable && <span className=" w-full flex justify-center font-bold text-red-500">Out of stock</span>}

        </p>
        <div className=" mx-auto  gap-3 p-5 flex flex-wrap justify-start items-center">
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
    </Modal>
  );
}

export default SizeBox;
