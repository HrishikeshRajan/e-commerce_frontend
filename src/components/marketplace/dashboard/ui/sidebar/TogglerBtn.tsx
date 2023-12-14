import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTypedDispatch } from 'hooks/user/reduxHooks';
import React from 'react';
import { toggleSidebar } from 'utils/reduxSlice/appSlice';

function TogglerBtn() {
  const dispatch = useTypedDispatch();
  return (
    <button data-drawer-target="default-sidebar" onClick={() => dispatch(toggleSidebar())} data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className=" first-letter:p-2 mt-2 ms-3 text-sm text-gray-950  rounded-lg sm:hidden hover:bg-gray-100 ">
      <span className="sr-only">Open sidebar</span>
      <FontAwesomeIcon icon={faBars} size="2xl" className="cursor-pointer active:scale-110" />
    </button>
  );
}

export default TogglerBtn;
