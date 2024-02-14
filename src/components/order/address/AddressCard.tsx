import LineSmall from '@/components/home/ui/LineSmall';
import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import { ORDER } from '@/utils/API';
import orderHelper from '@/utils/order.helper';
import { addAddressId } from '@/utils/reduxSlice/orderSlice';
import React from 'react';

export interface Address {
  fullname: string
  city: string
  homeAddress: string
  state: string
  postalCode: string
  phoneNo: string
  country: string
  _id:string
  isPrimary:boolean
  isDefault:boolean
}

function AddressCard({ address }:{ address:Address }) {
  const orderId = orderHelper.getOrderId();

  const dispatch = useTypedDispatch();
  const addAddress = () => {
    dispatch(addAddressId(address._id));
    ORDER.put(`/${orderId}/addresses/${address._id}`).then(() => {
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="p-5 lg:p-3  w-full my-1 bg-white border-2 rounded relative border-slate-100 shadow-sm">
      <input type="radio" name="address" onChange={addAddress} value={address._id} className="accent-gray-800 absolute top-0 left-0 m-3  w-3 h-3 " />
      <h1 className="text-lg lg:text-base font-bold mt-5 lg:mt-5 text-slate-800">{address.fullname}</h1>
      <LineSmall />
      <p className="text-base lg:text-sm font-semibold text-slate-800">{address.homeAddress}</p>
      <p className="text-base lg:text-sm font-semibold text-slate-800">
        Mobile:
        {' '}
        {address.phoneNo}
      </p>
      <div className="flex justify-start gap-5 mt-5 lg:mt-3">
        <button type="button" className="p-2 lg:p-1 border-2 text-slate-600 border-slate-200 text-xs font-semibold ">REMOVE</button>
        <button type="button" className="p-2 lg:p-1 border-2 text-slate-600 border-slate-200 text-xs font-semibold ">EDIT</button>
      </div>
    </div>
  );
}

export default AddressCard;
