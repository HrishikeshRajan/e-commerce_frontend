import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTypedDispatch, useTypedSelector } from 'hooks/user/reduxHooks';
import React from 'react';
import { toggleSidebar } from 'utils/reduxSlice/appSlice';

function ToggleButton() {
  const dispatch = useTypedDispatch();
  const isOpen = useTypedSelector((store) => store.app.sidebarIsOpen);

  // Button will be visible when isopen state is true
  return (
    <button data-drawer-target="default-sidebar" onClick={() => dispatch(toggleSidebar())} data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className={`${isOpen ? 'fixed' : 'hidden'} top-0 left-0  ms-1 z-50 text-sm text-white rounded-lg sm:hidden active:scale-105  hover:bg-gray-100 `}>
      <span className="sr-only">Open sidebar</span>
      <FontAwesomeIcon icon={faXmark} size="3x" />
    </button>
  );
}

export default ToggleButton;
