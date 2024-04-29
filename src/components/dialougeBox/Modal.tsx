// import { usePageFreeze } from '@/hooks/user/usePageFreeze';
import React, {
  ElementRef, HTMLAttributes, useRef,
} from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  children:React.ReactNode;
  className?:string;
  title?:string;
  togglerFn:() => void;
} & HTMLAttributes<HTMLDivElement>;

const Modal = (props:ModalProps) => {
  /**
   * This hook hides the veritical scroll
   */
  // usePageFreeze();
  const refOuter = useRef<ElementRef<'div'>>(null);
  const refModal = useRef<ElementRef<'div'>>(null);

  function isClickOutSideOfModal(e:MouseEvent) {
    return (refModal && refModal.current && !refModal.current.contains(e.target as Node));
  }

  function isClickOnBackdrop(e:MouseEvent) {
    return (refOuter && refOuter.current?.contains(e.target as Node));
  }

  window.addEventListener('click', (e: MouseEvent) => {
    if (refModal && refModal.current) {
      if (isClickOutSideOfModal(e) && isClickOnBackdrop(e)) {
        // dispatch(toggleModal());
        props.togglerFn();
      }
    }
  });
  return createPortal(
    <>
      <div
        ref={refOuter}
        role="button"
        aria-label="cancel"
        tabIndex={0}
        className="fixed z-50 inset-0 backdrop-blur-sm  "
      />
      <div ref={refModal} className={`w-72 sm:w-8/12  md:w-6/12  z-50  lg:w-4/12 shadow-xl bg-white rounded border-gray-300 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${props.className} `}>
        {props.children}
      </div>
    </>,
    document.getElementById('dialougeBox')!,
  );
};

Modal.displayName = 'Modal';

export default Modal;
