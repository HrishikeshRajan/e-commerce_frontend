/* eslint-disable import/no-extraneous-dependencies */
import { Cart } from '@/types/Cart';
import { isEmpty } from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router';
import orderHelper from '@/utils/order.helper';
import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import { addOrderId } from '@/utils/reduxSlice/orderSlice';
import { placeOrder } from './apis/placeOrder';

function PlaceOrderButton({ summary }:{ summary:Cart }) {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const handlePlaceOrder = () => {
    placeOrder(summary.cartId!).then((result) => {
      orderHelper.addOrderId(result?.data.message.order.orderId);
      dispatch(addOrderId(result?.data.message.order.orderI));
      navigate('/address');
    }).catch((error:any) => {
      console.log(error);
    });
  };
  return (
    <div>
      {summary
      && <button type="button" onClick={handlePlaceOrder} className={` mt-5 text-white  w-full p-2  ${summary && isEmpty(summary.products) ? 'disabled:bg-slate-600 cursor-auto' : 'bg-gray-950 active:scale-95 ease-in-out duration-300'} rounded`} disabled={summary && !!isEmpty(summary.products)}>PLACE ORDER</button>}
    </div>
  );
}

export default PlaceOrderButton;
