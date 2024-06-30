import useFetchUserPromos from '@/hooks/user/useAllPromos';
import { Promo } from '@/types/Promo';
import Coupon from '@/components/coupons/Coupon';
import Loader from '@/components/ui/Loader';
import Heading from '../ui/Heading';
import Line from '../ui/Line';

const isCouponExpired = (coupon:Promo) => coupon.status === 'EXPIRED';
function LatestOffers() {
  const { loadingPromos, promos } = useFetchUserPromos();
  if (loadingPromos) return null;
  if (!promos || (promos && promos.length < 1)) {
    return (
      <div
        className="w-full top-full mt-20 relative h-56 sm:h-96 bg-slate-700 flex justify-center text-center items-center flex-col"
      >
        <Loader title="Looking for latest offers for you" className="text-xl sm:text-3xl my-10 font-semibold text-slate-200" />
      </div>
    );
  }
  return (
    <div className="overflow-hidden">
      <Heading className="text-xl xl:text-4xl headingDecorator text-orange-500 drop-shadow-lg text-center mt-10 font-bold">
        LATEST OFFERS
      </Heading>
      <Line />
      <div className="flex w-full gap-2 justify-center mt-10 overflow-y-auto">
        {promos && promos.map((coupon:Promo) => {
          if (!isCouponExpired(coupon)) {
            return <Coupon key={coupon._id} coupon={coupon} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default LatestOffers;
