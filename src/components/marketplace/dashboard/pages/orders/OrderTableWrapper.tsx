/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';

import { useParams } from 'react-router-dom';
import TableTemplate from './Table';
import ShopOrderTab from '../../ui/tabs/ShopOrderTab';

function OrderTableWrapper() {
  const params = useParams();
  return (
    <div className="w-full top-full mt-20">
            <ShopOrderTab />
            <TableTemplate paramsId={params.id!} />
    </div>
  );
}

export default OrderTableWrapper;
