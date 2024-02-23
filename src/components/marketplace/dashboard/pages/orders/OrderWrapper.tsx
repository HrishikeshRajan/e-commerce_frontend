import useShops from '@/hooks/useShops';
import React from 'react';
import LineSmall from '@/components/home/ui/LineSmall';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import ShopListCard from '../../ui/cards/ShopListCard';

function OrderWrapper() {
  const shops = useTypedSelector((store) => store.marketplace.shopsList);
  useShops();

  return (
    <div className="w-full bg-white h-screen mt-20 p-10 flex flex-col ">
      <div className="bg-white relative w-full flex flex-col ">
        <h1 className="font-bold text-gray-400   text-2xl">Select shop to see orders</h1>
        <div className="w-6/12">
          {' '}
          <LineSmall />
        </div>

        <div className=" mx-auto relative rounded-2xl gap-2  flex  flex-wrap">
          {shops && shops.shops.map((shop:any) => <ShopListCard shop={shop} key={shop._id} />)}

        </div>

      </div>
    </div>
  );
}

export default OrderWrapper;
