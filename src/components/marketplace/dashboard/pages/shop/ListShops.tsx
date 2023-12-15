import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { addShops } from '@/utils/reduxSlice/markeplaceSlice';
import { StatusCodes } from 'http-status-codes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShopSlash } from '@fortawesome/free-solid-svg-icons';
import ShopCard from '../../ui/cards/ShopCard';
import { getShops } from './apis/listShops';

function ListShops() {
  const dispatch = useTypedDispatch();
  const userId = useTypedSelector((store) => store.app.user?._id);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    if (userId) {
      getShops(signal, userId).then((response) => {
        if (response && response.statusCode === StatusCodes.OK && response.success) {
          dispatch(addShops(response.message?.message));
        }
      });
    }
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const shops = useTypedSelector((store) => store.marketplace.shop.shops);
  if (shops.length < 1) {
    return (
      <div className="w-full text-slate-600 flex gap-3 flex-col justify-center items-center">

        <FontAwesomeIcon icon={faShopSlash} size="2xl" />
        <h1>It looks like you don&apos;t own any shops yet.</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap justify-center p-2 md:justify-start mt-32 gap-3 lg:mt-20 md:w-8/12">
      {shops.map((item) => <ShopCard key={item._id} item={item} />)}

    </div>
  );
}

export default ListShops;