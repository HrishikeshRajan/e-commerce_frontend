import useShops from '@/hooks/useShops';
import React from 'react';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import ShopListCard from '../../ui/cards/ShopListCard';

function OrderWrapper() {
  const shops = useTypedSelector((store) => store.marketplace.shopsList);
  useShops();

  return (
    <div className="w-full sm:w-6/12 mt-20 xl:absolute xl:left-96 flex bg-white flex-col ">
      <div className="bg-white relative w-full flex flex-col ">
        <h1 className="font-bold text-gray-400  p-3  text-xl">Select shop to see orders</h1>

        <div className=" w-full gap-2 rounded-xl flex  flex-wrap">
          {shops && shops.shops.map((shop) => <ShopListCard shop={shop} key={shop._id} />)}

        </div>

      </div>
    </div>
  );
}

export default OrderWrapper;
