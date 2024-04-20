import { Address } from '@/types/Orders';
import React from 'react';

type PrimaryAddress = {
  children:React.ReactElement;
  setAddress:(add: Address) => void;
  address:Address };
function PrimaryAddressFactory({ children, setAddress, address }:PrimaryAddress) {
  setAddress(address);
  return (
    <div className="relative w-full">

      <span className=" text-slate-400  right-0 me-3 top-3 text-xs absolute z-10">Primary</span>
      {children}
    </div>
  );
}

export default PrimaryAddressFactory;
