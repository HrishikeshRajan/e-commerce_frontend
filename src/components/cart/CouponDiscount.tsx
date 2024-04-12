/* eslint-disable security/detect-object-injection */
import React from 'react';
// import { Promo } from '@/types/Promo';
import { Flat, Percentage } from '@/types/Cart';
import { formattedAmount } from '@/utils/convertToRupees';

const isCoupon = (coupon:Percentage | Flat) : coupon is Percentage => coupon.type === 'PERCENTAGE';
function CouponDiscount({ coupon }:{ coupon: Percentage | Flat }) {
  return (
    <div className="flex flex-col my-2">

      <span className="bg-red-700 w-fit px-1 text-xs my-1  text-white font-semibold">{isCoupon(coupon) ? `${coupon.discountPercentage}%` : `${formattedAmount(coupon.discountFixedAmount)} OFF`}</span>

      <div className="flex w-full items-center my-1  gap-4 text-sm">
        {/* Offer price */}
        <span className="font-semibold text-sm">{formattedAmount(Math.round(coupon.discountedPriceAftTax))}</span>

        {/* {orinal price} */}
        <span className="text-slate-400">
          MRP
          <del>{formattedAmount(coupon.originalAmount)}</del>
        </span>
        {/* offer type */}

      </div>
      <span className="text-blue-500 py-2 flex text-xs">Tax included</span>
      <span className="text-green-500 text-xs">
        You saved&nbsp;
        {formattedAmount(Number(coupon.yourSavings.toFixed()))}
      </span>

      {/* your savings */}
    </div>
  );
}

export default CouponDiscount;
