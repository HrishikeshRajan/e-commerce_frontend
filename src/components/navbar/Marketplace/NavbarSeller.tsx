/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
import useCartSyncToLocalStorage from '@/hooks/useCartSyncToLocalStorage';
import useFlashSyncToLocalStorage from '@/hooks/useFlashSyncToLocalStorage';

import { toggleSidebarMarketplace } from '@/utils/reduxSlice/appSlice';
import { FaBars } from 'react-icons/fa6';
import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import Nav from '@/components/CustomElements/Nabar/Nav';
import { SiGooglesearchconsole } from 'react-icons/si';
import useUserSync from '@/hooks/user/useUserSync';
import CompanyName from '../CompanyName';

function SellerNavbar() {
  const dispatch = useTypedDispatch();
  useCartSyncToLocalStorage();
  useFlashSyncToLocalStorage();
  useUserSync();
  return (
    <Nav className=" flex items-center justify-between bg-white h-20  fixed top-0 z-40 w-full shadow-md   p-2  ">

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            dispatch(toggleSidebarMarketplace());
          }}
        >
          <FaBars />
        </button>
        <CompanyName className="text-gray-600 font-semibold items-center hidden text-sm lg:pl-4" />
      </div>
      <div className="mr-10">
        <ul>
          <li className="border-2 p-2 text-slate-400 flex items-center justify-center gap-2 rounded-xl border-cyan-500">
            <SiGooglesearchconsole />
            <span> Seller Console</span>
          </li>
        </ul>
      </div>
    </Nav>

  );
}

export default SellerNavbar;
