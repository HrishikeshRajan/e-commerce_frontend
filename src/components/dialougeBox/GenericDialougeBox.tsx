/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { createPortal } from 'react-dom';
import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import { toggleQtyDialogueBox } from '@/utils/reduxSlice/cartSlice';
import { usePageFreeze } from '../../hooks/user/usePageFreeze';

interface IDialougeBox {
  children:React.ReactNode
  title:string
  info?:string
}

function GenericDialougeBox({
  title, children, info,
}:IDialougeBox) {
  /**
   * This hook hides the veritical scroll
   */
  usePageFreeze();
  const dispatch = useTypedDispatch();

  return createPortal(
    <>
      <div
        role="button"
        aria-label="cancel"
        tabIndex={0}
        className="absolute z-50 inset-0 backdrop-blur-sm"
        onClick={() => dispatch(toggleQtyDialogueBox())}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            dispatch(toggleQtyDialogueBox());
          }
        }}
      />
      <div className=" w-11/12 z-50  lg:w-4/12 h-36 border-2 bg-white rounded border-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col py-10 px-2 justify-center items-center ">
        <p className="text-gray-600 my-6 font-semibold text-xs">
          {title}
          <span className="text-bold px-2 text-black">{info}</span>
        </p>
        <div className=" w-full  py-1 px-5 flex justify-evenly items-center">
          {children}
        </div>
      </div>
    </>,
    document.getElementById('dialougeBox')!,
  );
}

export default GenericDialougeBox;
