/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import LineSmall from '@/components/home/ui/LineSmall';
import { Address, ClientOrder } from '@/types/Orders';
import Button from '@/components/auth/ui/Button';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/utils/BackButton';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import AddressCard from './AddressCard';
import PrimaryAddressFactory from '../factory/PrimaryAddressFactory';
import ProceedToPaymentButton from '../../payment/ProceedToPaymentButton';
import 'react-toastify/dist/ReactToastify.css';

function ShippingAddress() {
  const addresses = useTypedSelector((store) => store.app.user?.address);
  const [selectedAddress, setAddress] = useState<Address>();
  const navigate = useNavigate();

  const setAdd = (add:Address) => {
    const myOrder = localStorage.getItem('order');
    if (!myOrder) throw new Error('No order found in local storage');
    const parsedOrder = JSON.parse(myOrder) as ClientOrder;
    parsedOrder.shippingAddress = add;
    localStorage.setItem('order', JSON.stringify(parsedOrder));
    setAddress(add);
  };

  return (
    <div className="lg:container w-full  h-screen  flex top-full mt-20 xl:mt-5 flex-col">
      <BackButton>
        <HiOutlineArrowNarrowLeft />
        Back to CART
      </BackButton>
      <div className="w-full flex justify-center items-center">
        <div className="lg:mt-36 lg:w-6/12 w-full px-2 flex justify-between items-center">
          <h1 className="font-bold my-1 text-xs">Select Delivery Address</h1>
          <Button
            mode="idle"
            type="button"
            className=" text-xs rounded my-1 p-3 shadow-md"
            onClick={() => navigate('/account/address/add')}
            disabled={false}
          >
            ADD NEW ADDRESS
          </Button>
        </div>
        <LineSmall />
      </div>

      <div className="w-full  flex justify-center overflow-y-auto">
        <div className=" w-full px-2 rounded lg:w-6/12 flex flex-col justify-center items-center overflow-y-auto ">
          {
            addresses && addresses.length > 0
           && addresses
             .map((address:Address) => {
               if (address.isPrimary) {
                 return (
                   <PrimaryAddressFactory
                     key={address._id}
                     address={address}
                     setAddress={setAddress}
                   >
                     <AddressCard
                       address={address}
                       selectedAddress={selectedAddress!}
                       setAddress={setAdd}
                     />
                   </PrimaryAddressFactory>
                 );
               }
               return (
                 <AddressCard
                   address={address}
                   key={address._id}
                   selectedAddress={selectedAddress!}
                   setAddress={setAdd}
                 />
               );
             })
          }
        </div>
      </div>
      <div className="w-full fixed bottom-0 lg:static lg:bottom-auto flex lg:my-10 justify-center lg:px-2">
        <ProceedToPaymentButton />
      </div>
    </div>
  );
}

export default ShippingAddress;
