import React from 'react';
import { Link } from 'react-router-dom';

function ProductNotFoundError({ category }:{ category:string }) {
  return (
    <div className="w-full h-screen  mt-20">
      <p className="text-slate-600 pl-20 mt-28 text-sm">
        <Link to="/">home</Link>

        {' '}
        /
        { ' '}
        {category}
      </p>
      <h2 className="text-lg text-slate-700  my-10 p-5 lg:ms-20 font-normal ">
        {' '}
        <span className="text-slate-900 font-semibold">
          {category}
        </span>
        {' '}
        -
        {' '}
        <span>
          (
          {0}
          ) items
        </span>
      </h2>
      <div className="w-full text-black  flex justify-center items-center">
        <h2>No products found</h2>
      </div>
    </div>
  );
}

export default ProductNotFoundError;
