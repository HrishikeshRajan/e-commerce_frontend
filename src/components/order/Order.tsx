import React, { useState } from 'react';
import { CartItemDocument, ORDER_STATUS } from '@/types/Cart';
import LineSmall from '../home/ui/LineSmall';
import cancelOrder from './apis/cancel';
import CancelButton from './ui/cancelBtn';
import ProductImage from './ui/ProductImage';

function Order({ cartItem, orderedAt, cartId }:
{ cartItem:CartItemDocument, orderedAt:string, cartId:string }) {
  const [item, setItem] = useState<CartItemDocument>(cartItem);
  const status = ORDER_STATUS.CANCELED;
  const orderStatus = {
    orderStatus: status,
  };
  const handleCancelOrders = () => {
    cancelOrder(cartId, cartItem.productId._id)
      .then(() => setItem({ ...item, ...orderStatus }));
  };

  return (
    <div className=" p-3  flex bg-[#fdfff5] flex-col rounded-xl shadow-md  w-8/12">
      <div className="text-xs font-bold text-slate-500 p-2 flex justify-between items-center">
        <span className="font-base">
          <span className="font-bold">Ordered On </span>
          {new Date(orderedAt).toLocaleDateString()}
        </span>
        <div className="p-1">
          <small className="text-slate-500">Order   Status : </small>
          <span className={`font-bold  p-1 ${item.orderStatus === ORDER_STATUS.CANCELED ? ' text-red-500' : ' text-green-600'} rounded `}>
            {item.orderStatus}
          </span>
        </div>

      </div>
      <LineSmall />
      <div className="flex items-center">
        <ProductImage url={cartItem.productId.images[0].secure_url} />
        <div className="flex flex-col justify-center">
          <h1 className="text-sm font-semibold text-slate-700 p-1">{item.productId.name}</h1>
          <h4 className="text-slate-500 text-sm p-1">{item.productId.brand}</h4>
          <span className="text-slate-500 text-sm p-1">
            Qty:
            {' '}
            {item.qty}
          </span>
          <span className="text-slate-500 text-sm p-1">
            Size:
            {' '}
            {' '}
            {item.options.size}
          </span>
          <span className="text-slate-500 text-sm p-1">
            color:
            {item.options.color}
          </span>
          <div className="flex gap-3">
            {item.orderStatus !== ORDER_STATUS.CANCELED
             && <CancelButton handleCancelOrders={handleCancelOrders} /> }
          </div>
        </div>
      </div>

    </div>
  );
}

export default Order;
