import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

function ShopListCard({ shop }:{ shop:any }) {
  return (
    <div className="w-5/12  bg-white gap-2 p-5 h-fit hover:bg-pink-50 rounded-2xl shadow-md flex justify-between items-center  ">
      {shop.logo && <img src={shop.logo.secure_url} alt="shop" className="w-20 h-20 m-2 rounded-full " />}
      <div className="flex-1">
        <h1 className="text-slate-700 py-1 font-bold">{shop.name}</h1>
        <p className="text-slate-600 font-semibold">Latest orders :10</p>
        <p className="text-slate-600">
          Shop Status:
          {' '}
          {' '}
          {shop.isActive ? <small className="text-white bg-green-500 rounded-3xl px-2 py-1 my-1"> Active </small>
            : <small className="text-white bg-red-500 rounded-3xl px-2 py-1 my-1">Deactivated</small>}
        </p>
        <small className="text-slate-600 text-center">
          created on
          {' '}
          {' '}
          {new Date(shop.created).toLocaleDateString()}
        </small>
      </div>
      <div>
        <Link to={`${shop._id}/order`} className="p-2"><IoIosArrowForward /></Link>
      </div>

    </div>
  );
}

export default ShopListCard;
