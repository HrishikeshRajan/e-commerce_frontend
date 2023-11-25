/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { deleteAddress } from '../apis/deleteAddress';
import AuthHelper from '../../auth/apis/helper';

interface IProps {
  address:any
}
function Address({ address }:IProps) {
  const handleDelete = () => {
    AuthHelper.removeAuthenticatedUserAddress(address._id);

    deleteAddress(address._id).then((response) => {
      console.log(response);
    });
  };
  return (
    <div className=" shadow-md px-5 w-full lg:w-4/12 py-3  ">
      <div className="flex w-full justify-between">
        <div className="w-full">
          <h1 className="font-bold text-sm text-slate-800">{address.fullname}</h1>

        </div>
        <div className="w-20 flex my-2 items-center">
          <Link to={`edit/${address._id}`} className="px-2 mr-3 py-1 text-slate-600 rounded"><FontAwesomeIcon icon={faPenToSquare} /></Link>
          <button type="button" onClick={handleDelete} className="px-2 py-1 mr-3 text-slate-600 rounded"><FontAwesomeIcon icon={faTrash} /></button>

        </div>
      </div>
      <hr />
      <address className="py-3">{address.homeAddress}</address>
      <p className="text-sm">{address.city}</p>
      <p className="text-sm">{address.phoneNo}</p>
      <p className="text-sm">{address.postalCode}</p>

      <p className="text-sm">{address.state}</p>
      <p className="text-sm">{address.country}</p>

    </div>
  );
}

export default Address;
