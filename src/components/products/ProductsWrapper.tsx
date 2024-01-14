/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import { useTypedSelector } from '@/hooks/user/reduxHooks';

import queryString from 'query-string';
import ProductNotFoundError from './ProductNotFoundError';
import Card from './Card';
import { ProductUser } from './types';
import { ProductBaseUrl } from '../marketplace/urlConstants';
import ScrollToTopButton from './ScrollToTopButton';
import Loading from './Loading';

function ProductCardsWrapper() {
  const params = useParams();
  const [queryObj, setQueryObj] = useState({ page: 1, category: params.category });
  const productMeta = useTypedSelector((store) => store.products.userProductsMeta);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductUser[]>();

  async function getProd(signal:any, query:any) {
    try {
      const response = await fetch(`${ProductBaseUrl(`list?${queryString.stringify(query)}`)}`, {
        method: 'GET',
        credentials: 'include',
        signal,
      });
      return await response.json();
    } catch (errors) {
      console.log(errors);
    }
  }

  // Initial Load
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    async function getInitial() {
      try {
        const response = await fetch(`${ProductBaseUrl(`list?page=1&category=${params.category}`)}`, {
          method: 'GET',
          credentials: 'include',
          signal,
        });
        return await response.json();
      } catch (errors) {
        console.log(errors);
      }
    }
    getInitial().then((response) => {
      if (response && response.statusCode === 200
           && response.message.products
           && response.message.products.length > 1) {
        setProducts(response.message.products);
      } else if (response && response.statusCode === 404) {
        console.log('product not found');
      }
    });
    return () => {
      abortController.abort();
    };
  }, [params.category]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    if (queryObj.page > 1 && hasMore) {
      getProd(signal, queryObj).then((response) => {
        setLoading(false);
        if (response && response.statusCode === 200
           && response.message.products
           && response.message.products.length > 1) {
          setProducts((prev) => [...prev!, ...response.message.products]);
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
  }, [hasMore, queryObj]);

  const handleScroll = async () => {
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
  };

  useEffect(() => {
    setQueryObj((prevQueryObj) => ({ ...prevQueryObj, page }));
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!products || (products && products.length < 1)) {
    return <ProductNotFoundError category={params.category} />;
  }

  return (
    <div className="w-full h-screen  mt-28">
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
  );
}

export default ProductCardsWrapper;
