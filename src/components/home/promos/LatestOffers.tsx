/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import useFetchUserPromos from '@/hooks/user/useAllPromos';
import { Promo } from '@/types/Promo';
import Coupon from '@/components/coupons/Coupon';
import Loader from '@/components/ui/Loader';
import ProductSliderCard from '@/components/productSlider/ProductSlider';
import Slider from 'react-slick';
import Heading from '../ui/Heading';
import Line from '../ui/Line';

const isCouponExpired = (coupon:Promo) => coupon.status === 'EXPIRED';
function LatestOffers() {
  const { loadingPromos, promos } = useFetchUserPromos();
  if (loadingPromos) return null;
  if (!promos || (promos && promos.length < 1) || loadingPromos) {
    return (
      <div
        className="w-full top-full mt-20 relative h-56 sm:h-96 bg-slate-700 flex justify-center text-center items-center flex-col"
      >
        <Loader title="Looking for latest offers for you" className="text-xl sm:text-3xl my-10 font-semibold text-slate-200" />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="overflow-hidden">
      <Heading className="text-xl xl:text-4xl headingDecorator text-orange-500 drop-shadow-lg text-center mt-10 font-bold">
        Exclusive Offers
      </Heading>
      <Line />
      <div className="block md:flex">
        <div className="flex w-full md:w-8/12 p-2 gap-2 justify-center sm:justify-start mt-10 overflow-y-auto">

          <ProductSliderCard title="TRENDING" className="w-full h-fit">
            <Slider {...settings}>
              {promos && promos.map((coupon:Promo) => {
                if (!isCouponExpired(coupon)) {
                  return <Coupon key={coupon._id} coupon={coupon} />;
                }
                return null;
              })}
            </Slider>

          </ProductSliderCard>

        </div>
        <div className="w-full md:w-4/12 hidden">
          <ProductSliderCard title="DEALS" className="w-full h-fit">
            <Slider {...settings}>
              {promos && promos.map((coupon:Promo) => {
                if (!isCouponExpired(coupon)) {
                  return <Coupon key={coupon._id} coupon={coupon} />;
                }
                return null;
              })}
            </Slider>

          </ProductSliderCard>
        </div>
      </div>
    </div>
  );
}

export default LatestOffers;
