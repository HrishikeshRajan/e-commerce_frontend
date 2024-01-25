/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import useProductsQuery from '@/hooks/user/useProductsQuery';
import Loading from '@/utils/animations/Loading';

import Card from './Card';
import ProductNotFoundError from './ProductNotFoundError';
import SortWrapper from '../home/filter/SortWrapper';
import ProductsShimmer from '../shimmer/ProductsShimmer';

function Products() {
  const [page] = useState(1);

  const [searchParams] = useSearchParams();
  const {
    products, loading, hasMore,
  } = useProductsQuery(page, searchParams);
  if (loading) return <ProductsShimmer />;
  return (

    <div className="w-full flex  bg-red-20 h-screen ">
      <div className="w-full">
        <SortWrapper />
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

export default Products;
