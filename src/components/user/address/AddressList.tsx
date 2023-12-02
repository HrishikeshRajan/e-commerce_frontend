import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Address from './Address';
import CreateAddressBtn from './CreateAddressBtn';
import { IAddress } from '..';

function AddressList() {
  const address = useLoaderData() as IAddress[];
  const [createAddress, setCreateAddress] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full   p-5 bg-white ">
      <h1 className="text-2xl text-slate-800 font-bold  ">Manage Address</h1>
      <hr className="mb-10" />

      <CreateAddressBtn data={createAddress} action={setCreateAddress} />
      <div className="flex flex-wrap gap-2 justify-start">
        {address
  && address.map((item:any) => <Address key={item._id} address={item} />)}
      </div>
    </div>
  );
}

export default AddressList;