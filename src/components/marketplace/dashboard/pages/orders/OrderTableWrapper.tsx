/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';

import { useParams } from 'react-router-dom';
import Table from './Table';
import ShopOrderTab from '../../ui/tabs/ShopOrderTab';

function OrderTableWrapper() {
  const params = useParams();
  return (
    <div className="w-full mt-28 p-2">
            <h1 className="text-xl font-bold text-slate-500 p-3">Your Orders</h1>
            <ShopOrderTab />
            <Table paramsId={params.id!} />
    </div>
  );
}

export default OrderTableWrapper;
