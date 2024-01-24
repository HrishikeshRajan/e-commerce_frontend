/* eslint-disable react/display-name */

/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Link } from 'react-router-dom';
import { ProductUser } from './types';
import Ratings from './Ratings';

function Card({
  name,
  price,
  brand,
  _id,
  numberOfReviews,
  ratings,
  images,
}:Pick<ProductUser, 'name' | 'price' | 'brand' | '_id' | 'ratings' | 'images' | 'numberOfReviews' >) {
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(parseFloat(price));

  return (
    <Link to={`/view/${_id}`}>
      <div className="relative lg:m-1 flex w-48 lg:w-56   flex-col overflow-hidden  border border-gray-100 bg-white shadow-sm">
        <div className="relative px-1 flex h-52 overflow-hidden ">
          <img className="object-cover w-full" src={(images && images[0].secure_url) || 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'} alt="product image" />

        </div>
        <div className="mt-4 px-5 pb-5 ">
          <div className=" overflow-hidden ">
            <h5 className="text-sm tracking-tight text-slate-900">{brand}</h5>

            <h5 className="text-base  text-slate-500 overflow-hidden overflow-ellipsis h-10 whitespace-nowrap">{name}</h5>

          </div>
          <div className="mt-2 mb-5 flex items-start justify-between flex-col gap-2">
            <p>
              <span className="text-xl font-bold text-slate-900">{formattedAmount}</span>

            </p>
            <div className="flex items-center">
              <Ratings ratings={ratings} />

              <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">

                {numberOfReviews}

              </span>
            </div>
          </div>

        </div>
      </div>
    </Link>

  );
}

export default Card;
