/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons/faCartPlus';
import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage';
import { Link, useNavigate } from 'react-router-dom';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { removeAuthentication, removeUser } from '@/utils/reduxSlice/appSlice';
import Logo from '../../assets/smartshop.png';
import DefaultUser from '../../assets/defaultUser.png';
import { useUpdateLocalStore } from '../../hooks/user/useUpdateLocalStore';
import { useTypedDispatch, useTypedSelector } from '../../hooks/user/reduxHooks';
import TogglerBtn from '../marketplace/dashboard/ui/sidebar/TogglerBtn';
import { DropdownProfile } from './constants';
import AuthHelper from '../auth/apis/helper';
import { signout } from '../auth/apis/signout';

function Navbar() {
  const signedIn = useTypedSelector((store) => store.app);
  const user = useTypedSelector((store) => store.app.user);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const [accountTab, setAccountTab] = useState(false);

  const signOut = async () => {
    await signout().then(() => {
      AuthHelper.clearSignedOnData(() => {
        dispatch(removeUser());
        dispatch(removeAuthentication());
        navigate('/auth');
      });
    });
  };

  // Keeps local storage sync with redux store change
  useUpdateLocalStore();

  return (
    <nav className="  fixed top-0 w-full shadow-md bg-white  p-2 ">
      <div className="border-gray-200 flex justify-between items-center sm:px-4 ">
        <Link to="/" className="hidden sm:block">
          <img
            src={Logo}
            alt="Logo"
            className="w-16 object-cover cursor-pointer rounded-full "
          />
        </Link>
        <TogglerBtn />
        {!signedIn.authPage && (
          <>
            <div className=" w-2/4 hidden lg:flex items-center justify-end">
              <input
                type="search"
                name="search"
                placeholder="Search products here"
                id="search"
                data-testid="searchbox-lg"
                className="inline-block  outline-none border-2 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
              <button
                type="button"
                aria-label="search"
                className="p-2 rounded-tr rounded-br border-none bg-gray-400 text-white"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
              </button>
            </div>
            <ul className="flex p-3 w-full md:w-3/6  justify-end gap-5 ">
              <li className="pr-2 sm:px-3" aria-label="language">
                <FontAwesomeIcon
                  icon={faLanguage}
                  className="text-slate-700"
                  size="lg"
                />
                <span className="pl-1">eng</span>
              </li>
              <li className="pr-2 sm:px-3  relative" aria-label="profile">
                {/* Profile Dropdown comes here */}
                <button onClick={() => setAccountTab(!accountTab)} id="dropdownLeftButton" data-dropdown-toggle="dropdownLeft" data-dropdown-placement="left" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
                  <span className="sr-only">Open user menu</span>
                  <img className="w-8 h-8 rounded-full" src={DefaultUser} alt="user" />
                </button>
                <div id="dropdownLeft" className={`z-10 ${accountTab ? 'block absolute' : 'hidden'} bg-white divide-y divide-gray-100  rounded-lg shadow w-44 right-0`}>
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div className="truncate text-slate-800">{user?.email}</div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 right-0" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                    <li>

                      {DropdownProfile.map((item) => <Link key={item.id} to={item.path} className="block px-4 py-2 hover:bg-gray-100 text-slate-800">{item.title}</Link>)}
                    </li>

                  </ul>
                  <button className="py-2 w-full" type="button" onClick={signOut}>
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100   text-slate-800">Sign out</a>
                  </button>
                </div>

              </li>
              <li className="pr-2 sm:px-3" aria-label="cart">
                <FontAwesomeIcon
                  icon={faCartPlus}
                  className="text-slate-700"
                  size="lg"
                />
                <span
                  className="bg-red-800 mx-1 px-1 text-white rounded"
                  aria-label="quantity"
                >
                  0
                </span>
              </li>
            </ul>
          </>
        )}
      </div>
      {!signedIn.authPage && (
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
  );
}

export default Navbar;
