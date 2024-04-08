/* eslint-disable react/display-name */

/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Link } from 'react-router-dom';
import { ProductUser } from './types';
import Ratings from './Ratings';
import Para from '../CustomElements/Para';
import Span from '../CustomElements/Span';
import Div from '../CustomElements/Div';

type CardProps = Pick<ProductUser, 'name' | 'price' | 'brand' | '_id' | 'ratings' | 'images' | 'numberOfReviews' >;
function Card({
  name,
  price,
  brand,
  _id,
  numberOfReviews,
  ratings,
  images,
}:CardProps) {
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(parseFloat(price));

  return (
    <Link to={`/product/${_id}`} className="w-6/12 relative lg:m-1 flex lg:w-56  xl:rounded-xl   flex-col overflow-hidden  border border-gray-100 bg-white shadow-sm">
      <Div className="relative px-1 flex h-52 overflow-hidden ">
        <img className="object-cover w-full" src={(images && images[0].secure_url) || 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'} alt="product image" />
      </Div>
      <Div className="mt-1 px-2 ">
        <Div className=" overflow-hidden ">
          <Para>
            {brand}
          </Para>
          <Para className="text-xs  text-slate-500 overflow-hidden overflow-ellipsis h-10 whitespace-nowrap">
            {name}
          </Para>
        </Div>

        <Div className=" mb-2 flex  items-start justify-between flex-col">
          <Para className="flex gap-1 items-center">
            <Span className="text-slate-400 text-xs ">
              MRP:
            </Span>
            <Span className="text-sm font-bold text-slate-700">
              {formattedAmount}
            </Span>
          </Para>
          <Div className="flex items-center my-1 text-xs">
            <Ratings ratings={ratings} />
            <Span className="mr-2 ml-3 rounded bg-yellow-200 px-1.5 py-0.5 text-xs font-semibold">
              {numberOfReviews}
            </Span>
          </Div>
        </Div>
      </Div>
    </Link>

  );
}

export default Card;
