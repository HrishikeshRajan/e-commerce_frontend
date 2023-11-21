/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditAddress from './EditAddress';

interface IProps {
  address:any
  key:any
}
function Address({ address }:IProps) {
  const [edit, setEdit] = useState(false);

  if (edit) return <EditAddress address={address} />;
  return (
    <div className=" shadow-md px-5 py-3 my-2">
      <h1 className="font-bold text-xl text-slate-800">{address.fullname}</h1>
      <hr />
      <address className="py-4">{address.homeAddress}</address>
      <p className="text-sm">{address.city}</p>
      <p className="text-sm">{address.phoneNo}</p>
      <p className="text-sm">{address.postalCode}</p>

      <p className="text-sm">{address.state}</p>
      <p className="text-sm">{address.country}</p>
      <hr />
      <div className="w-full flex my-2 items-center justify-start">
        <button type="button" onClick={() => setEdit(!edit)} className="px-2 mr-3 py-1 bg-slate-300 rounded">Edit</button>
        <button type="button" className="px-2 py-1 mr-3 bg-slate-300 rounded">Delete</button>

      </div>
    </div>
  );
}

export default Address;
