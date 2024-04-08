/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import useProductsQuery from '@/hooks/user/useProductsQuery';
import Loading from '@/utils/animations/Loading';

import { useTypedSelector } from '@/hooks/user/reduxHooks';
import Card from './Card';
import ProductNotFoundError from './ProductNotFoundError';
import ProductsShimmer from '../shimmer/ProductsShimmer';
import Div from '../CustomElements/Div';
import Sort from '../home/filter/Sort';

function Products() {
  const [page] = useState(1);

  const [searchParams] = useSearchParams();
  const products = useTypedSelector((store) => store.products.userProducts);
  const {
    loading, hasMore,
  } = useProductsQuery(page, searchParams);
  if (loading) return <ProductsShimmer />;

  return (

    <Div className="w-full flex bg-red-20 ">
      <Div className="w-full">
        <Div className="w-full container  top-full mt-20 lg:mt-10 flex justify-end">
          <Sort />
        </Div>
        {products && products.length ? (
          <Div className="w-full flex flex-wrap justify-center ">
            {products.map((item) => <Card key={item._id} {...item} />)}
          </Div>
        ) : <ProductNotFoundError /> }
        <Div className="w-full flex justify-center">
          {loading && <Loading />}
          {!hasMore && <ProductNotFoundError />}
        </Div>
      </Div>
    </Div>
  );
}

export default Products;
