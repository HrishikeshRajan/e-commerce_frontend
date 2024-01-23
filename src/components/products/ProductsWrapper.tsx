/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import useProductsQuery from '@/hooks/user/useProductsQuery';
import Loading from '@/utils/animations/Loading';

import Card from './Card';
import Sidebar from '../home/sidebar/Sidebar';
import ProductNotFoundError from './ProductNotFoundError';

function ProductCardsWrapper() {
  const [page] = useState(1);

  const [searchParams] = useSearchParams();
  const {
    products, loading, hasMore,
  } = useProductsQuery(page, searchParams);

  return (
    <div className="w-full flex absolute  bg-red-20 h-screen  mt-28">
      <Sidebar />
      <div className="w-full">
        {products && (
          <div className="w-full flex flex-wrap md:gap-2 lg:p-2 justify-center">
            {products.map((item) => <Card key={item._id} {...item} />)}
          </div>
        )}
        <div className="w-full flex justify-center">
          {loading && <Loading />}
          {!hasMore && <ProductNotFoundError category={searchParams.get('category')!} />}
        </div>
      </div>
    </div>
  );
}

export default ProductCardsWrapper;
