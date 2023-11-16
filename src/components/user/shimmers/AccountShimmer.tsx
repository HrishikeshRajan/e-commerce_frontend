/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { Link } from 'react-router-dom';

function AccountShimmer() {
  return (
    <div className="container  h-screen  inset-0 p-10">
      <div className="flex flex-col">
        <Link to="/orders" className="h-14 flex items-center px-3  bg-white border-2 border-slate-100 "><p className="bg-slate-500 w-full" /></Link>
        <Link to="/profile" className="h-14 flex items-center bg-white px-3 border-2 border-slate-100 "><p className="bg-slate-500 w-full" /></Link>
        <Link to="/marketplace" className="h-14 flex items-center bg-white px-3 border-2 border-slate-100 "><p className="bg-slate-500 w-full" /></Link>
        <Link to="/language" className="h-14 flex items-center bg-white border-2 px-3 border-slate-100 "><p className="bg-slate-500 w-full" /></Link>
        <Link to="#" className="h-14 flex items-center bg-white border-2 px-3 border-slate-100 ">
          <p className="bg-slate-500 w-full" />
        </Link>

      </div>
    </div>
  );
}

export default AccountShimmer;
