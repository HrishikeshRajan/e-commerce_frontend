/* eslint-disable react/no-array-index-key */
import { useEffect } from 'react';
import LineSmall from '@/components/home/ui/LineSmall';
import { Address } from '@/types/Orders';
import Button from '@/components/auth/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { createOrder, setShippingAdress } from '@/utils/reduxSlice/orderSlice';
import orderHelper from '@/utils/order.helper';
import cart from '@/utils/cart.helper';
import { addToCart } from '@/utils/reduxSlice/cartSlice';

import AddressCard from './AddressCard';
import PrimaryAddressFactory from '../factory/PrimaryAddressFactory';
import ProceedToPaymentButton from '../../payment/ProceedToPaymentButton';
import 'react-toastify/dist/ReactToastify.css';

function ShippingAddress() {
  const addresses = useTypedSelector((store) => store.app.user?.address);
  const hasAddress = useTypedSelector((store) => store.order.order?.shippingAddress);
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const setAdd = (add:Address) => {
    dispatch(setShippingAdress({ address: add }));
    orderHelper.setShippingAddress(add);
  };

  /**
   * keeps redux updated on page refresh
   */
  useEffect(() => {
    const localOrder = orderHelper.getOrder();
    if (localOrder) {
      dispatch(createOrder({ order: localOrder }));
    }
  }, [dispatch]);

  useEffect(() => {
    const localCart = cart.get();
    if (localCart) {
      dispatch(addToCart(localCart));
    }
  }, [dispatch]);
  return (
    <div className="lg:container w-full  h-screen  flex top-full mt-20 xl:mt-5 flex-col">
      {/* <BackButton>
        <HiOutlineArrowNarrowLeft />
        Back to CART
      </BackButton> */}
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

      <div className="w-full  flex justify-center  ">
        <div className=" w-full px-2 rounded lg:w-6/12 flex flex-col scroll-smooth justify-center items-center overflow-y-auto ">
          {
            addresses && addresses.length > 0
           && addresses
             .map((address:Address) => {
               if (address.isPrimary) {
                 return (
                   <PrimaryAddressFactory
                     key={address._id}
                   >
                     <AddressCard
                       address={address}
                       setAddress={setAdd}
                     />
                   </PrimaryAddressFactory>
                 );
               }
               return (
                 <AddressCard
                   address={address}
                   key={address._id}
                   setAddress={setAdd}
                 />
               );
             })
          }
        </div>
      </div>
      {hasAddress && hasAddress._id ? (
        <div className="w-full fixed bottom-0 lg:static lg:bottom-auto flex lg:my-10 justify-center lg:px-2">
          <ProceedToPaymentButton />
        </div>
      ) : null}
    </div>
  );
}

export default ShippingAddress;
