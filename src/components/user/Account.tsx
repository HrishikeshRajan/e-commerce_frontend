/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignoutDialougeBox from './SignoutDialougeBox';

function Account() {
  const [signout, setSignOut] = useState(false);

  return (
    <div className="flex  min-h-full p-2  justify-center items-center">
      <div className="mt-20 w-full flex flex-col lg:w-full">
        <Link to="/orders" className="h-14 flex items-center px-3  bg-white border-2 border-slate-100 text-slate-500 font-semibold">Your Orders</Link>
        <Link to="/account/profile" className="h-14 flex items-center bg-white px-3 border-2 border-slate-100 text-slate-500 font-semibold">Your Profile</Link>
        <Link to="/marketplace" className="h-14 flex items-center bg-white px-3 border-2 border-slate-100 text-slate-500 font-semibold">Wondercart Marketplace</Link>
        <Link to="/language" className="h-14 flex items-center bg-white border-2 px-3 border-slate-100 text-slate-500 font-semibold">language prefference</Link>
        <Link to="#" onClick={() => setSignOut(!signout)} className="h-14 flex items-center bg-white border-2 px-3 border-slate-100 text-slate-500 font-semibold">
          Signout
          <FontAwesomeIcon icon={faRightFromBracket} className="mx-1" />
        </Link>

      </div>
      {signout && <SignoutDialougeBox status={signout} action={setSignOut} />}
    </div>
  );
}

export default Account;
