/* eslint-disable max-len */
import React from 'react';
import { ClientCart } from '@/types/Cart';
import { formattedAmount } from '@/utils/convertToRupees';
import { isEmpty } from 'lodash';
import { getFinalPriceIncludeTax } from '@/utils/price.utils';
import LineSmall from '../home/ui/LineSmall';
import CheckoutButton from './CheckoutButton';

function Summary({ summary }:{ summary:ClientCart }) {
  return (
    <div className="lg:w-5/12 w-full shadow-sm rounded-xl border mt-10 p-3 h-fit lg:mt-40  ">
      <h1 className="text-slate-900 font-bold text-lg py-3">Order Summary</h1>
      <LineSmall />
      <span className="text-slate-400 my-2">
        Discount Applied:
        { summary
        && summary.products
        && !isEmpty(summary.products) && Object.entries(summary.products)
          .map(([id, product]) => <span key={id}>{` ${product.offers?.flashsale.discountPercentage}%`}</span>)}
      </span>
      <h3 className="font-normal text-slate-800">
        <span className="text-normal"> Total  Amount: &nbsp;</span>
        { summary
        && summary.products
        && !isEmpty(summary.products) && Object.entries(summary.products)
          .map(([id, product]) => (
            <span key={id}>
              {formattedAmount(getFinalPriceIncludeTax(product.offers?.flashsale.priceAfterDiscount || 0))}
            </span>
          ))}
      </h3>
      <CheckoutButton summary={summary} />
    </div>
  );
}

export default Summary;
