import { getProductsByQuery } from '@/components/products/apis/getProducts';
import { ProductUser } from '@/components/products/types';
import { merge } from 'lodash';
import { useEffect, useState } from 'react';

const useProductsQuery = (
  query: Record<string, string | number>,
  page: number,
) => {
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductUser[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    setLoading(true);
    setError(false);
    merge(query, { page });
    getProductsByQuery(query, signal)
      .then((response) => {
        if (response) {
          setProducts((preProducts) => [
            ...preProducts,
            ...(response.message?.products || []),
          ]);

          setHasMore(response.message.products.length > 0);
          setLoading(false);
        }
      })
      .catch((e: unknown) => {
        console.log(e);
        setError(true);
      });

    return () => abortController.abort();
  }, [query, page]);

  return {
    loading,
    products,
    hasMore,
    error,
  };
};

export default useProductsQuery;
