import { getProductsByQuery } from '@/components/products/apis/getProducts';
import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import { updateProducts } from '@/utils/reduxSlice/productSlice';
import { useTypedDispatch, useTypedSelector } from './reduxHooks';

const useProductsQuery = (
  query: Record<string, string | number>,
  page: number,
) => {
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    setLoading(true);
    setError(false);
    merge(query, { page });
    getProductsByQuery(query, signal)
      .then((response) => {
        if (response) {
          dispatch(updateProducts(response.message?.products || []));

          setHasMore(response.message.products.length > 0);
          setLoading(false);
        }
      })
      .catch((e: unknown) => {
        console.log(e);
        setError(true);
      });

    return () => abortController.abort();
  }, [query, page, dispatch]);
  const products = useTypedSelector((store) => store.products.userProducts);

  return {
    loading,
    products,
    hasMore,
    error,
  };
};

export default useProductsQuery;
