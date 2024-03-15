import LineSmall from '@/components/home/ui/LineSmall';
import { Address } from '@/types/Orders';

import React from 'react';

type AddressCardProps = {
  address:Address,
  selectedAddress:Address,
  setAddress:(add: Address) => void
};
function AddressCard({ address, selectedAddress, setAddress }:AddressCardProps) {
  return (
    <div className="p-5 lg:p-3  w-full my-1 bg-white border-2 rounded-xl relative border-slate-100 shadow-sm">
      <input type="radio" name="address" checked={selectedAddress._id === address._id} onChange={() => setAddress(address)} value={address._id} className="accent-gray-800 absolute top-0 left-0 m-3  w-3 h-3 " />
      <h1 className="text-lg lg:text-base font-bold mt-5 lg:mt-5 text-slate-800">{address.fullname}</h1>
      <LineSmall />
      <p className="text-base lg:text-sm font-semibold text-slate-800">{address.homeAddress}</p>
      <p className="text-base lg:text-sm font-semibold text-slate-800">
        Mobile:
        {' '}
        {address.phoneNo}
      </p>
      <div className="flex justify-start gap-5 mt-5 lg:mt-3">
        <button type="button" className=" rounded-xl p-2 lg:p-1 border-2 text-slate-600 border-slate-200 text-xs font-semibold ">REMOVE</button>
        <button type="button" className=" rounded-xl p-2 lg:p-1 border-2 text-slate-600 border-slate-200 text-xs font-semibold ">EDIT</button>
      </div>
    </div>
  );
}

export default AddressCard;
