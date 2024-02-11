/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import LineSmall from '@/components/home/ui/LineSmall';
import { USER } from '@/utils/API';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import AddressCard, { Address } from './AddressCard';
import PrimaryAddressFactory from '../factory/PrimaryAddressFactory';
import ContinueBtn from './ContinueBtn';

function ShippingAddress() {
  const [addresses, setAddresses] = useState<Address[]>();
  const addressId = useTypedSelector((store) => store.order.addressId);
  useEffect(() => {
    USER.get('/address', { withCredentials: true }).then((result) => {
      setAddresses(result.data.message.user.address);
    });
  }, []);
  return (
    <div className="lg:container w-full mt-24 lg:-mt-10  flex justify-center item-center  flex-col">
      <div className="w-full flex justify-center">
        <div className="lg:mt-36 lg:w-6/12 w-full px-2 flex justify-between items-center">
          <h1 className="font-bold my-1 text-xs">Select Delivery Address</h1>
          <button type="button" className=" text-xs rounded my-1 p-3 shadow-md">ADD NEW ADDRESS</button>
        </div>
        <LineSmall />
      </div>

      <div className="w-full  flex justify-center">
        <div className=" w-full px-2 rounded lg:w-6/12 flex flex-col justify-center items-center ">
          {
            addresses
           && addresses
             .map((address:Address) => {
               if (address.isPrimary) {
                 return (
                   <PrimaryAddressFactory key={address._id}>
                     <AddressCard address={address} />
                   </PrimaryAddressFactory>
                 );
               }
               return <AddressCard address={address} key={address._id} />;
             })
          }
        </div>
      </div>
      <div className="w-full fixed bottom-0 lg:static lg:bottom-auto flex lg:my-10 justify-center lg:px-2">
        {addressId && <ContinueBtn />}
      </div>
    </div>
  );
}

export default ShippingAddress;
