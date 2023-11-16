/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons/faCartPlus';
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser';
import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage';
import { Link } from 'react-router-dom';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import Logo from '../../assets/smartshop.png';

function Navbar() {
  return (
    <nav className="border-2  sticky top-0 z-50 bg-white">
      <div className="container border-gray-200 flex justify-between items-center sm:px-4 ">
        <div>
          <Link to="#">
            <img
              src={Logo}
              alt="Logo"
              className="w-16 object-cover rounded-full"
            />
          </Link>
        </div>
        <div className=" w-2/4 hidden lg:flex">
          <input
            type="search"
            name="search"
            placeholder="Search products here"
            id="search"
            data-testid="searchbox-lg"
            className="block flex-1 border-2 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          />
          <button
            type="button"
            aria-label="search"
            className="p-1 rounded-tr rounded-br border-none bg-gray-400 text-white"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
          </button>
        </div>
        <div>
          <ul className="flex items-center">
            <li className="pr-2 sm:px-3" aria-label="language">
              <FontAwesomeIcon
                icon={faLanguage}
                className="text-slate-700"
                size="lg"
              />
              <span className="pl-1">eng</span>
            </li>
            <li className="pr-2 sm:px-3 " aria-label="profile">
              <FontAwesomeIcon
                icon={faUser}
                className="text-slate-700 "
                size="lg"
              />
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
        </div>
      </div>
      <div className=" w-full flex justify-center lg:hidden p-3">
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
    </nav>
  );
}

export default Navbar;
