/* eslint-disable react/jsx-props-no-spreading */
import { ProductUser } from '@/components/products/types';
import { Slider } from '@/utils/slider/SliderWrapper';
import usePreviousPurchases from '@/hooks/user/usePreviousPurchases';
import Card from '@/components/products/Card';
import Heading from '../ui/Heading';
import Line from '../ui/Line';

function PreviousOrders() {
  const { orders, loadingOrders } = usePreviousPurchases();
  if (loadingOrders) return null;
  if (!orders || (orders && orders.length < 1)) return null;
  return (
    <div className="container shadow-md xl:px-5 py-2">
      <Heading className="text-xl xl:text-4xl  text-orange-500 drop-shadow-lg text-center mt-10 font-bold">
        PREVIOUS PURCHASES
      </Heading>
      <Line />
      <Slider>
        <div className="flex w-full gap-2  justify-start mt-10">
          {orders.map((item:Pick<ProductUser, 'name' | 'price' | 'brand' | '_id' | 'ratings' | 'images' | 'numberOfReviews' >) => <Card key={item._id} {...item} />)}
        </div>
      </Slider>

    </div>
  );
}

export default PreviousOrders;
