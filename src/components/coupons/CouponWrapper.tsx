import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Promo } from '@/types/Promo';
import ExpiredCard from '@/utils/PromoDecorators/ExpiredCard';
import Coupon from './Coupon';
import LineSmall from '../home/ui/LineSmall';

const isCouponExpired = (endTime:string) => {
  const currentDate = new Date().toString();
  const endDateModified = new Date(endTime).toString();
  if (currentDate > endDateModified) {
    return true;
  }
  return false;
};
function CouponWrapper() {
  const data = useLoaderData() as any;
  return (
    <div className="container">
      <div className="w-full flex flex-col ">
        <div className="mt-28">
          <h1 className="text-3xl my-2 font-semibold text-slate-400">My Promos</h1>
          <LineSmall />
        </div>
        <div className="flex gap-10">
          {data.message.tes.map((coupon:Promo) => {
            if (isCouponExpired(coupon.endTime)) {
              return <ExpiredCard key={coupon._id}><Coupon coupon={coupon} /></ExpiredCard>;
            }
            return <Coupon key={coupon._id} coupon={coupon} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default CouponWrapper;
