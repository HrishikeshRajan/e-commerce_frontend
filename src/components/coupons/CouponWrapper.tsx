import { Promo } from '@/types/Promo';
import ExpiredCard from '@/utils/PromoDecorators/ExpiredCard';
import { useEffect, useState } from 'react';
import Coupon from './Coupon';

const isCouponExpired = (coupon:Promo) => coupon.status === 'EXPIRED';
function CouponWrapper() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/seller/promo?method=coupon`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setCoupons(data.message.tes));
  }, []);

  return (
    <div className="xl:container">
      <div className="w-full flex flex-col h-screen ">
        <div className="mt-28">
          <h1 className="text-3xl text-center xl:text-left p-5 font-semibold text-slate-400">MY PROMOS</h1>

        </div>
        <div className="flex w-full flex-wrap justify-center gap-2 ">
          {(coupons && coupons.length) ? coupons.map((coupon:Promo) => {
            if (isCouponExpired(coupon)) {
              return <ExpiredCard key={coupon._id}><Coupon coupon={coupon} /></ExpiredCard>;
            }
            return <Coupon key={coupon._id} coupon={coupon} />;
          })
            : <h1>No coupons found</h1>}
        </div>
      </div>
    </div>
  );
}

export default CouponWrapper;
