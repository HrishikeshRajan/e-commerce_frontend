/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import useCartSyncToLocalStorage from '@/hooks/useCartSyncToLocalStorage';
import useFlashSyncToLocalStorage from '@/hooks/useFlashSyncToLocalStorage';

import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/user/reduxHooks';
import Search from './Search';
import CartNavIcon from './CartNavIcon';

import Logo from './Logo';
import CompanyName from './CompanyName';
import { Menu } from './Menu';
import LensIconButton from './utils/LensIconButton';

function Navbar() {
  const app = useTypedSelector((store) => store.app);
  const [isSearchEnable, setSearchEnable] = useState(false);
  const [search, setSearch] = useSearchParams();
  // const dispatch = useTypedDispatch();
  useCartSyncToLocalStorage();
  useFlashSyncToLocalStorage();
  const enableSearch = () => {
    setSearchEnable(!isSearchEnable);
  };

  const clearSearch = () => {
    setSearchEnable(false);
    if (search.get('name')) {
      search.delete('name');
      setSearch(search);
    }
  };
  return (
    <nav className=" flex items-center h-20 fixed top-0 z-40 w-full shadow-md bg-white  p-2  ">

      {!app.authPage && <Logo />}
      {!isSearchEnable && (
        <CompanyName className="text-gray-600 font-semibold items-center xl:hidden text-sm lg:pl-4" />

      )}

      <div className="border-gray-200 flex justify-end w-full items-center sm:px-4 ">

        {!app.authPage && (
          <>
            {isSearchEnable && (
              <span className="w-full  xl:w-4/12 flex items-center justify-between xl:justify-end relative">
                <Search />
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-black flex absolute right-0  items-center"
                >
                  <IoIosCloseCircleOutline />
                </button>
              </span>
            )}
            <div className="flex p-3 w-auto items-center   justify-end space-x-2">

              {!isSearchEnable && (
                <span className="pr-1 flex items-center " aria-label="search">
                  <LensIconButton enableSearch={enableSearch} />
                </span>
              )}
              <Menu />

              <span className=" flex items-center" aria-label="cart">
                <CartNavIcon />
              </span>

            </div>
          </>
        )}
      </div>
    </nav>

  );
}

export default Navbar;
