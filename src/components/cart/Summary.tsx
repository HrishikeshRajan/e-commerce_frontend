import React from 'react';
import { CartDocument } from '@/types/Cart';
import LineSmall from '../home/ui/LineSmall';
import PlaceOrderButton from './PlaceOrderButton';

function Summary({ summary }:{ summary:CartDocument }) {
  return (
    <div className="lg:w-5/12 w-full shadow-sm rounded border mt-10 p-3 h-fit lg:mt-40  ">
      <h1 className="text-slate-900 font-bold text-lg py-3">Order Summary</h1>
      <h2>{}</h2>
      <LineSmall />
      <h3 className="font-normal text-slate-800">
        <span className="text-normal"> Total  Amount:</span>
        {' '}
        {' '}
        {(summary && summary?.grandTotalPriceString) || 0}
      </h3>
      <PlaceOrderButton summary={summary} />
    </div>
  );
}

export default Summary;
