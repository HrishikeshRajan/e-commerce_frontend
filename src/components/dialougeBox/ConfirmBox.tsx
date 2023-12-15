/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { createPortal } from 'react-dom';
import { usePageFreeze } from '../../hooks/user/usePageFreeze';

interface IDialougeBox {
  children:React.ReactNode
  title:string
  info?:string
}

function ConfirmBox({ title, children }:IDialougeBox) {
  /**
   * This hook hides the veritical scroll
   */
  usePageFreeze();

  return createPortal(
    <>
      <div className="fixed inset-0 backdrop-blur-sm"> </div>
      <div className=" w-11/12  lg:w-4/12 h-36 border-2 bg-white rounded border-gray-300 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col py-10 px-2 justify-center items-center ">
        <p className="text-gray-600 my-6 font-semibold text-xs">{title}</p>
        <div className=" w-full  py-1 px-5 flex justify-evenly items-center">
          {children}
        </div>
      </div>
    </>,
    document.getElementById('dialougeBox')!,
  );
}

export default ConfirmBox;
