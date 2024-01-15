/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';

import { addProducts, addProductsMeta, updateProducts } from '@/utils/reduxSlice/productSlice';
import ProductNotFoundError from './ProductNotFoundError';
import Card from './Card';

import ScrollToTopButton from './ScrollToTopButton';
import Loading from './Loading';
import { getInitialProducts, getProductsByQuery } from './apis/getProducts';
import UserSidebar from '../home/sidebar/UserSidebar';

function ProductCardsWrapper() {
  const params = useParams();
  const [queryObj, setQueryObj] = useState({ page: 1, category: params.category });
  const productMeta = useTypedSelector((store) => store.products.userProductsMeta);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useTypedDispatch();
  const products = useTypedSelector((store) => store.products.userProducts);

  // Initial Load
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    if (products.length < 1 || (products.length > 1 && products[0].category !== params.category)) {
      getInitialProducts(params.category, signal).then((response) => {
        if (response && response.statusCode === 200
           && response.message.products
           && response.message.products.length > 1) {
          dispatch(addProducts(response.message.products));
          dispatch(addProductsMeta({
            itemsShowing: response.message.itemsShowing,
            totalItems: response.message.totalItems,
          }));
        } else if (response && response.statusCode === 404) {
          console.log('product not found');
        }
      });
    }
    return () => {
      abortController.abort();
    };
  }, [dispatch, params.category, products]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    if (queryObj.page > 1 && hasMore) {
      getProductsByQuery(signal, queryObj).then((response) => {
        setLoading(false);
        if (response && response.statusCode === 200
           && response.message.products
           && response.message.products.length > 1) {
          dispatch(updateProducts(response.message.products));
          dispatch(addProductsMeta({
            itemsShowing: response.message.itemsShowing,
            totalItems: response.message.totalItems,
          }));
        } else if (response && response.statusCode === 404) {
          console.log('product not found');
        } else if (response.message.error) {
          setHasMore(false);
          setLoading(false);
        }
      });
    }
    return () => {
      abortController.abort();
    };
  }, [dispatch, hasMore, queryObj]);

  const handleScroll = useCallback(async () => {
    try {
      const { scrollHeight } = document.documentElement;
      const { innerHeight } = window;
      const { scrollTop } = document.documentElement;

      if (scrollTop + innerHeight >= scrollHeight) {
        if (hasMore) {
          setPage((currentPage) => currentPage + 1);
          setLoading(true);
        }
      }
    } catch (errors) {
      console.log(errors);
    }
  }, [hasMore]);

  useEffect(() => {
    setQueryObj((prevQueryObj) => ({ ...prevQueryObj, page }));
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (!products || (products && products.length < 1)) {
    return <ProductNotFoundError category={params.category!} />;
  }

  return (
    <div className="w-full flex absolute  bg-red-20 h-screen  mt-28">
      <UserSidebar />
      <div className="w-full">
        <p className="text-slate-600 pl-5 lg:pl-20 mt-48 lg:mt-20 text-sm ">
          <Link to="/">home</Link>

          {' '}
          /
          { ' '}
          {params.category}
        </p>
        <h2 className="text-lg text-slate-700  my-10 p-5 lg:ms-20 font-normal ">
          {' '}
          <span className="text-slate-900 font-semibold">
            {params.category}
          </span>
          {' '}
          -
          {' '}
          <span>
            (
            {productMeta.totalItems || 0}
            ) items
          </span>
        </h2>
        {products && (
          <div className="w-full flex flex-wrap md:gap-2 lg:p-2 justify-center">
            {products.map((item) => <Card key={item._id} {...item} />)}
          </div>
        )}
        {loading && hasMore

                && (
                  <Loading />
                )}
        {!hasMore && <ScrollToTopButton />}
      </div>
    </div>
  );
}

export default ProductCardsWrapper;
