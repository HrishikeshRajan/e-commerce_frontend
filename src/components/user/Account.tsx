/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  faAddressBook, faLanguage, faRightFromBracket, faShop,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons/faBasketShopping';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import SignoutDialougeBox from './SignoutDialougeBox';

function Account() {
  const [signout, setSignOut] = useState(false);
  return (
    <div className="flex flex-col lg:flex-row  min-h-full p-2 gap-2">
      <div className=" w-full flex lg:flex-col  lg:w-4/12">
        <NavLink to="orders" className="h-14 flex w-full items-center px-3  bg-white border-2 border-slate-100 text-slate-500 font-semibold">
          <>
            <FontAwesomeIcon icon={faBasketShopping} className="lg:hiden" />
            <p className="hidden lg:inline-block px-2">Your Orders</p>
          </>
        </NavLink>
        <NavLink to="profile" className="h-14 flex  w-full items-center bg-white px-3 border-2 border-slate-100 text-slate-500 font-semibold">

          <>
            <FontAwesomeIcon icon={faUser} className="" />
            <p className="hidden lg:inline-block px-2">Your Profile</p>
          </>

        </NavLink>
        <NavLink to="address" className="h-14 flex w-full  items-center bg-white px-3 border-2 border-slate-100 text-slate-500 font-semibold">

          <>
            <FontAwesomeIcon icon={faAddressBook} className="lg:hiden" />
            <p className="hidden lg:inline-block px-2">Your Address</p>
          </>

        </NavLink>
        <NavLink to="marketplace" className="h-14 w-full  flex items-center bg-white px-3 border-2 border-slate-100 text-slate-500 font-semibold">
          <>
            <FontAwesomeIcon icon={faShop} className="lg:hiden" />
            <p className="hidden lg:inline-block px-2">Marketplace</p>
          </>
        </NavLink>
        <NavLink to="language" className="h-14 flex w-full items-center bg-white border-2 px-3 border-slate-100 text-slate-500 font-semibold">
          <>
            <FontAwesomeIcon icon={faLanguage} className="lg:hiden" />
            <p className="hidden lg:inline-block px-2">Language Preferrence</p>
          </>
        </NavLink>
        <NavLink to="#" onClick={() => setSignOut(!signout)} className="h-14 w-full flex items-center bg-white border-2 px-3 border-slate-100 text-slate-500 font-semibold">

          <>
            <FontAwesomeIcon icon={faRightFromBracket} className="lg:hiden" />
            <p className="hidden lg:inline-block px-2">Signout</p>
          </>
        </NavLink>

      </div>
      {signout && <SignoutDialougeBox status={signout} action={setSignOut} />}

      <Outlet />

    </div>
  );
}

export default Account;
