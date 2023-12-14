/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { ShopCore, addShop } from 'utils/reduxSlice/markeplaceSlice';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAdminPanelSettings, MdEdit } from 'react-icons/md';
import { CgCalendarDates } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import defaultImage from '../../../../../assets/defaultUser.png';

type ShopCardPropTypes = {
  item:ShopCore
};
function ShopCard({ item }:ShopCardPropTypes) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleEdit = () => {
    dispatch(addShop(item));
    navigate(`/marketplace/dashboard/shop/edit/${item._id}`);
  };
  return (

    <div className="w-full md:w-64 h-56 bg-slate-700 border border-gray-200 rounded-lg shadow  relative">
      <Link to="/">
        <img className="rounded-full m-1 w-10 h-10" src={item.logo.secure_url ?? defaultImage} alt="logo" />
      </Link>
      <div role="button" onClick={handleEdit} className="absolute top-0 right-0 m-2 text-white active:scale-110">
        <MdEdit />
      </div>
      <div className="p-2 mb-4">
        <Link to="/">
          <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
        <Link to="/" className="inline-flex items-center px-2 py-1 text-sm font-bold text-center   rounded-lg bg-white text-slate-700 hover:scale-105">
          Visit
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </Link>
      </div>

      <div className="flex justify-between p-2">
        <small className="text-gray-100 font-normal flex gap-1 text-xs">
          <MdOutlineAdminPanelSettings />
          {`${item.owner.fullname}`}
        </small>
        <small className="font-normal text-gray-100 text-xs flex gap-2">
          <CgCalendarDates />
          {` ${new Date(item.created).toDateString()}`}
        </small>
      </div>
    </div>

  );
}

export default ShopCard;
