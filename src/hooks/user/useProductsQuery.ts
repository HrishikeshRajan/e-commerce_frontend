import { getProductsByQuery } from '@/components/products/apis/getProducts';
import { useEffect, useState } from 'react';
import {
  addProducts, addProductsMeta,
} from '@/utils/reduxSlice/productSlice';
import { URLSearchParams } from 'url';
import { StatusCodes } from 'http-status-codes';
import { useTypedDispatch, useTypedSelector } from './reduxHooks';

const useProductsQuery = (
  page: number,
  searchParams:URLSearchParams,
) => {
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (page === 0) return;
    const abortController = new AbortController();
    const { signal } = abortController;
    setLoading(true);
    setError(false);

    // const copyQuery:Record<any, any> = {
    //   // page,
    //   category: searchParams.get('category')!,
    //   brand: [...searchParams.getAll('brand')!],
    //   color: [...searchParams.getAll('color')!],
    // };

    // if (searchParams.get('sort') !== null) {
    //   copyQuery.sort = searchParams.get('sort');
    // }

    // if (searchParams.get('price[gte]') !== null) {
    //   copyQuery['price[gte]'] = searchParams.get('price[gte]');
    // }
    // if (searchParams.get('price[lte]') !== null) {
    //   copyQuery['price[lte]'] = searchParams.get('price[lte]');
    // }

    getProductsByQuery(searchParams.toString(), signal)
      .then((response) => {
        if (response && response.success) {
          dispatch(addProductsMeta({
            itemsShowing: response.message.itemsShowing,
            totalItems: response.message.totalItems,
            totalPages: response.message.totalPages,
          }));

          dispatch(addProducts(response.message?.products));
          setHasMore(response.message.products.length > 0);
          setLoading(false);
        } else if (response && !response.success && response.statusCode === StatusCodes.NOT_FOUND) {
          dispatch(addProducts([]));
          setHasMore(false);
          setLoading(false);
        }
      })
      .catch((e: unknown) => {
        console.log(e);
        setError(true);
      });

    return () => abortController.abort();
  }, [page, dispatch, searchParams]);
  const products = useTypedSelector((store) => store.products.userProducts);

  return {
    loading,
    products,
    hasMore,
    error,
  };
};

export default useProductsQuery;
