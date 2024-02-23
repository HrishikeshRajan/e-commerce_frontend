/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { CartDocument } from '@/types/Cart';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import Order from './Order';

function OrderCard({ order, cartId }:{ order:CartDocument, cartId:string }) {
  if (!order) return;
  return (
    <div className="flex  flex-col gap-3">
      { order && order.products && !isEmpty(order.products) && Object.entries(order.products)
        .map(([, cartItem]) => <Order cartItem={cartItem} orderedAt={order.updatedAt} cartId={cartId} key={uuidv4()} />)}
    </div>
  );
}

export default OrderCard;
