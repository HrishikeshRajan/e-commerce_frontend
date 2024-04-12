/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  faAddressBook, faLanguage, faRightFromBracket, faShop,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons/faBasketShopping';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import { removeAuthentication, removeUser } from '@/utils/reduxSlice/appSlice';

import { signout } from '../auth/apis/signout';
import AuthHelper from '../auth/apis/helper';

function Account() {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const signOut = async () => {
    await signout().then(() => {
      AuthHelper.clearSignedOnData(() => {
        dispatch(removeUser());
        dispatch(removeAuthentication());
        navigate('/auth');
      });
    });
  };

  return (
    <div className=" md:top-10  left-0 w-full  flex flex-col  mt-10 lg:flex-row  p-3 gap-2">
      <div className=" w-full top-full mt-10 flex lg:flex-col  md:w-[300px] ">
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
        <NavLink to="seller" className="h-14 w-full  flex items-center bg-white px-3 border-2 border-slate-100 text-slate-500 font-semibold">
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
        <NavLink to="#" onClick={signOut} className="h-14 w-full flex items-center bg-white border-2 px-3 border-slate-100 text-slate-500 font-semibold">

          <>
            <FontAwesomeIcon icon={faRightFromBracket} className="lg:hiden" />
            <p className="hidden lg:inline-block px-2">Signout</p>

          </>
        </NavLink>

      </div>

      <Outlet />

    </div>
  );
}

export default Account;
