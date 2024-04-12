import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Promo } from '@/types/Promo';
import ExpiredCard from '@/utils/PromoDecorators/ExpiredCard';
import Coupon from './Coupon';

const isCouponExpired = (coupon:Promo) => coupon.status === 'EXPIRED';
function CouponWrapper() {
  const data = useLoaderData() as any;
  return (
    <div className="xl:container">
      <div className="w-full flex flex-col ">
        <div className="mt-28">
          <h1 className="text-3xl text-center xl:text-left p-5 font-semibold text-slate-400">MY PROMOS</h1>

        </div>
        <div className="flex w-full flex-wrap justify-center gap-2 ">
          {data.message.tes.map((coupon:Promo) => {
            if (isCouponExpired(coupon)) {
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
