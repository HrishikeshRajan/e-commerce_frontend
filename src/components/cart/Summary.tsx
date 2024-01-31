import React from 'react';
import { Cart } from '@/types/Cart';
import { formattedAmount } from '@/utils/convertToRupees';
import LineSmall from '../home/ui/LineSmall';

function Summary({ summary }:{ summary:Cart }) {
  return (
    <div className="w-5/12 shadow-md border mx-2 p-3 h-fit lg:mt-40  ">
      <h1 className="text-slate-900 font-bold text-lg py-3">Order Summary</h1>
      <LineSmall />
      <h3 className="font-bold text-slate-500">
        <span className="text-xs"> Total  Amount:</span>
        {' '}
        {' '}
        {formattedAmount(summary.grandTotalPrice)}
      </h3>
      <button type="button" className="bg-gray-950 mt-5 text-white  w-full p-2 active:scale-95 ease-in-out duration-300">PLACE ORDER</button>
    </div>
  );
}

export default Summary;
