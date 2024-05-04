import { getProductsByQuery } from '@/components/products/apis/getProducts';
import { useEffect, useState } from 'react';
import {
  addBrandCount,
  addProducts, addProductsMeta,
} from '@/utils/reduxSlice/productSlice';
import { URLSearchParams } from 'url';
import {
  ErrorResponse, FetchApiResponse, hasFetchSucceeded, isFetchNotFoundError,
} from '@/types/Fetch';
import { ProductUser } from '@/components/products/types';
import { BrandCount } from '@/types/Product';
import { useTypedDispatch } from './reduxHooks';

type ProductQueryResponse = {
  products:Array<ProductUser>;
  itemsShowing:number;
  totalItems:number;
  totalPages:number;
  brandsCount: Array<BrandCount>;
};
const hasBrandCount = (response:
FetchApiResponse<ProductQueryResponse>) => response.message.brandsCount
   && response.message.brandsCount.length;
const useProductsQuery = (
  page: number,
  searchParams:URLSearchParams,
) => {
  const [hasMore, setHasMore] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (page === 0) return;
    const abortController = new AbortController();
    const { signal } = abortController;
    setProductsLoading(true);

    getProductsByQuery(searchParams.toString(), signal)
      .then((response: FetchApiResponse<ProductQueryResponse> | ErrorResponse) => {
        if (hasFetchSucceeded(response)) {
          dispatch(addProductsMeta({
            itemsShowing: response.message.itemsShowing,
            totalItems: response.message.totalItems,
            totalPages: response.message.totalPages,
          }));

          dispatch(addProducts(response.message.products));
          if (hasBrandCount(response)) {
            dispatch(addBrandCount(response.message.brandsCount));
          }

          setHasMore(response.message.products.length > 0);
          setProductsLoading(false);
        } else if (isFetchNotFoundError(response)) {
          dispatch(addProducts([]));
          setHasMore(false);
          setProductsLoading(false);
        }
      })
      .catch(() => {
        setError(true);
        setProductsLoading(false);
      });

    return () => abortController.abort();
  }, [page, dispatch, searchParams]);

  return {
    productsLoading,
    hasMore,
    error,
  };
};

export default useProductsQuery;
