/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage';
import { Link, useNavigate } from 'react-router-dom';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { isEmpty } from 'lodash';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useTypedDispatch, useTypedSelector } from 'hooks/user/reduxHooks';
import DefaultUser from '@/assets/defaultUser.png';
import {
  removeAuthentication, removeUser, toggleSidebar, toggleSignout,
} from '@/utils/reduxSlice/appSlice';
import ConfirmBox from '@/components/dialougeBox/ConfirmBox';

import AuthHelper from '@/components/auth/apis/helper';
import { signout } from '@/components/auth/apis/signout';
import Logo from '../Logo';

function SellerNavbar() {
  const app = useTypedSelector((store) => store.app);
  const user = useTypedSelector((store) => store.app.user);
  const doSignout = useTypedSelector((store) => store.app.doSignout);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const [accountTab, setAccountTab] = useState(false);

  // Clears all user data from redux and local storage
  const signOut = async () => {
    await signout().then(() => {
      AuthHelper.clearSignedOnData(() => {
        setAccountTab(false);
        dispatch(removeUser());
        dispatch(removeAuthentication());
        navigate('/auth');
      });
    });
  };

  const redirectToSignIn = () => {
    navigate('/auth');
  };

  // Keeps local storage sync with redux store change

  return (
    <>
      <nav className="  fixed top-0 z-40 w-full bg-white  shadow-md  p-2 ">
        <div className="border-gray-200 flex justify-between items-center sm:px-4 ">
          {/* Logo only visible from md screens */}
          <Link to="/" className="hidden md:block ">
            <Logo />
          </Link>
          <button type="button" onClick={() => dispatch(toggleSidebar())} className="mb-10 m-2 mt-4 ms-3  text-slate-700 absolute top-0 left-0  rounded-lg">
            <span className="sr-only">Open sidebar</span>
            <FontAwesomeIcon icon={faBars} size="2xl" className="cursor-pointer active:scale-11" />
          </button>

          {/** This section will not be visible in signin or signup pages */}
          {!app.authPage && (
            <ul className="flex p-3 w-full md:w-3/6   justify-end gap-5 ">

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
              <li className="pr-2 sm:px-3  group relative hidden md:block pb-1  items-center" aria-label="profile">

                {/* Profile Dropdown comes here */}

                <button onClick={() => setAccountTab(!accountTab)} className="flextext-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
                  <span className="sr-only">Open user menu</span>
                  <img className="w-8 h-8 rounded-full" src={DefaultUser} alt="user" />
                </button>
                <div id="dropdownLeft" className=" hidden group-hover:absolute group-hover:block bg-white divide-y divide-gray-100  mt-1 rounded-lg shadow w-44 right-0">
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div className="truncate text-slate-800">{user?.email}</div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 right-0" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">

                    {/* Any options to profile dropdown should come here */}

                    {accountTab && <button type="button" tabIndex={-1} className="fixed inset-0 -z-10 cursor-default " onClick={() => setAccountTab(!accountTab)}> </button>}
                  </ul>

                  {/* Shows signout if user exists else signin */}
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

            </ul>
          )}
        </div>
        {/* Only renders for small screens */}
        {!app.authPage && (
          <div className=" w-full flex justify-center flex-1 lg:hidden mt-5 p-3">
            <input
              type="search"
              name="search"
              placeholder="Search products here"
              id="search"
              aria-label="search box"
              data-testid="searchbox-sm"
              className="block w-full flex-1 border-2 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
            <button
              type="button"
              data-testid="search-btn"
              className="p-1 rounded-tr rounded-br border-none bg-gray-400 text-white"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
            </button>
          </div>
        )}
      </nav>
      {doSignout && (
        <ConfirmBox title="Are you sure you want to signout?">

          <button type="button" onClick={() => dispatch(toggleSignout())} className="w-1/3 p-2 font-bold text-xs bg-slate-200 hover:scale-105">No</button>
          <button type="button" onClick={signOut} className="w-1/3 p-2 font-bold bg-green-200 hover:scale-105 text-xs">Yes</button>

        </ConfirmBox>
      ) }
    </>
  );
}

export default SellerNavbar;
