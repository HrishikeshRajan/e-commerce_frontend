import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

function Account() {
  return (
    <div className="container  h-screen inset-0 p-10">
      <div className="flex flex-col">
        <Link to="/orders" className="h-14 flex items-center px-3  bg-white border-2 border-slate-100 text-slate-500 font-semibold">Your Orders</Link>
        <Link to="/profile" className="h-14 flex items-center bg-white px-3 border-2 border-slate-100 text-slate-500 font-semibold">Your Profile</Link>
        <Link to="/marketplace" className="h-14 flex items-center bg-white px-3 border-2 border-slate-100 text-slate-500 font-semibold">Wondercart Marketplace</Link>
        <Link to="/language" className="h-14 flex items-center bg-white border-2 px-3 border-slate-100 text-slate-500 font-semibold">language prefference</Link>
        <Link to="/signout" className="h-14 flex items-center bg-white border-2 px-3 border-slate-100 text-slate-500 font-semibold">
          Siginout

          <FontAwesomeIcon icon={faRightFromBracket} className="mx-1" />
        </Link>

      </div>
    </div>
  );
}

export default Account;
