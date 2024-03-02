/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage';
import { Link, useNavigate } from 'react-router-dom';
import {
  removeAuthentication, removeUser, toggleUserSidebar,
} from '@/utils/reduxSlice/appSlice';
import { isEmpty } from 'lodash';
import { faBars, faStore } from '@fortawesome/free-solid-svg-icons';
import { StatusCodes } from 'http-status-codes';
import useFetchUser from '@/hooks/user/useFetchUser';
import Logo from '../../assets/smartshop.png';
import DefaultUser from '../../assets/defaultUser.png';
import { useUpdateLocalStore } from '../../hooks/user/useUpdateLocalStore';
import { useTypedDispatch, useTypedSelector } from '../../hooks/user/reduxHooks';

import { DropdownProfile } from './constants';
import AuthHelper from '../auth/apis/helper';
import { signout } from '../auth/apis/signout';
import Search from './Search';
import CartNavIcon from './CartNavIcon';

function Navbar() {
  const app = useTypedSelector((store) => store.app);
  const user = useTypedSelector((store) => store.app.user);

  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const [accountTab, setAccountTab] = useState(false);

  // Clears all user data from redux and local storage
  const signOut = async () => {
    await signout().then((result:any) => {
      if (result.statusCode === StatusCodes.OK) {
        AuthHelper.clearSignedOnData(() => {
          setAccountTab(false);
          dispatch(removeUser());
          dispatch(removeAuthentication());
          navigate('/auth');
        });
      }
    });
  };

  const redirectToSignIn = () => {
    navigate('/auth');
  };
  useFetchUser();
  // Keeps local storage sync with redux store change
  // useUpdateLocalStore();

  return (
    <nav className="  fixed top-0 z-40 w-full shadow-md bg-white  p-2 ">
      <div className="border-gray-200 flex justify-evenly items-center sm:px-4 ">

        {!app.authPage && (
          <Link to="/" className="hidden sm:block">
            <img
              src={Logo}
              alt="Logo"
              width={80}
              height={80}
              className="w-20 h-20 object-cover cursor-pointer rounded-full "
            />
          </Link>
        )}
        {app.authPage && (
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              width={80}
              height={80}
              className="w-20 h-20 object-cover cursor-pointer rounded-full "
            />
          </Link>
        )}

        {/* Toggle Button */}
        {!app.authPage && (
          <button type="button" onClick={() => dispatch(toggleUserSidebar())} className="mb-10 m-2 mt-4 ms-3 md:hidden  text-slate-700 absolute top-0 left-0  rounded-lg">
            <span className="sr-only">Open sidebar</span>
            <FontAwesomeIcon icon={faBars} size="2xl" className="cursor-pointer active:scale-11" />
          </button>
        )}

        {/* Toggle Menu */}

        {!app.authPage && (
          <>
            <Search />
            <ul className="flex p-3 w-full md:w-3/6   justify-end gap-5 ">
              <li className="hidden lg:flex p-2 items-center justify-center cursor-pointer  border-2 rounded shadow-sm" aria-label="marketplace">

                <Link to="account/seller">
                  <FontAwesomeIcon
                    icon={faStore}
                    className="text-slate-700"
                    size="sm"
                  />
                  <span className="text-sm font-bold text-slate-800 pl-1">Become a Seller  </span>
                </Link>
              </li>
              <li className="pr-2 sm:px-3 flex items-center" aria-label="language">
                <FontAwesomeIcon
                  icon={faLanguage}
                  className="text-slate-700"
                  size="lg"
                />
                <span className="pl-1">eng</span>
              </li>
              <li className="block md:hidden">
                <img className="w-7 h-7 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={DefaultUser} alt="Bordered avatar" />
              </li>
              <li className="pr-2 sm:px-3  group   relative hidden md:block" aria-label="profile">
                {/* Profile Dropdown comes here */}
                <button onClick={() => setAccountTab(!accountTab)} id="dropdownLeftButton" data-dropdown-toggle="dropdownLeft" data-dropdown-placement="left" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
                  <span className="sr-only">Open user menu</span>
                  <img className="w-8 h-8 rounded-full" src={DefaultUser} alt="user" />
                </button>
                <div id="dropdownLeft" className={`hidden ${accountTab ? 'block absolute' : 'hiden'} group-hover:block group-hover:absolute bg-white divide-y divide-gray-100  mt-2 rounded-lg shadow w-44 right-0`}>
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div className="truncate text-slate-800">{user?.email}</div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 right-0">

                    {DropdownProfile.map((item) => (
                      <li key={item.id}>

                        <Link to={item.path} className="block px-4 py-2  hover:bg-gray-100 text-slate-800">{item.title}</Link>

                      </li>
                    ))}

                    {accountTab && <button type="button" tabIndex={-1} className="fixed inset-0 -z-10 cursor-default " onClick={() => setAccountTab(!accountTab)}> </button>}
                  </ul>
                  {
                    isEmpty(user) ? (
                      <button className="py-2 w-full" type="button" onClick={redirectToSignIn}>
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100   text-slate-800">Sign in</a>
                      </button>
                    )
                      : (
                        <button className="py-2 w-full" type="button" onClick={signOut}>
                          <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100   text-slate-800">Sign out</a>
                        </button>
                      )
                  }

                </div>

              </li>
              <li className="pr-2 sm:px-3 flex items-center" aria-label="cart">
                <CartNavIcon />
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>

  );
}

export default Navbar;
