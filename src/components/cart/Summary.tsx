import React from 'react';
import { Cart } from '@/types/Cart';
import { formattedAmount } from '@/utils/convertToRupees';
import LineSmall from '../home/ui/LineSmall';
import PlaceOrderButton from './PlaceOrderButton';

function Summary({ summary }:{ summary:Cart }) {
  return (
    <div className="lg:w-5/12 w-full shadow-sm rounded border mt-10 p-3 h-fit lg:mt-40  ">
      <h1 className="text-slate-900 font-bold text-lg py-3">Order Summary</h1>
      <LineSmall />
      <h3 className="font-bold text-slate-800">
        <span className="text-md"> Total  Amount:</span>
        {' '}
        {' '}
        {formattedAmount((summary && summary?.grandTotalPrice) || 0)}
      </h3>
      <PlaceOrderButton summary={summary} />
    </div>
  );
}

export default Summary;
