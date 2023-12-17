import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export interface ButtonProps {
  visibility:boolean
  setVisibility: () => void
}

function ToggleButton({ visibility, setVisibility }:ButtonProps) {
  return (
    <button data-drawer-target="default-sidebar" onClick={setVisibility} type="button" className={` mb-10 m-2 ms-1 top-0 left-0 ${visibility ? 'flex' : 'hidden'}   mt-4 ms-3  text-white  rounded-lg md:hidden hover:bg-gray-100 `}>
      <span className="sr-only">Open sidebar</span>
      <FontAwesomeIcon icon={faXmark} size="2xl" className="cursor-pointer active:scale-110 text-red-600" />
    </button>
  );
}

export default ToggleButton;
