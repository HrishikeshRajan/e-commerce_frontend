import { generalProductSearch } from '@/components/products/apis/generalSearch';
import { ProductUser } from '@/components/products/types';
import { ErrorResponse, FetchApiResponse, hasFetchSucceeded } from '@/types/Fetch';
import { addProducts } from '@/utils/reduxSlice/productSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const useSearchProducts = () => {
  const dispatch = useDispatch();
  const [searchError, setSearchError] = useState<string>();
  const [search, setSearch] = useSearchParams();
  useEffect(() => {
    const abortSignal = new AbortController();
    const { signal } = abortSignal;

    if (search.size && search.get('name')) {
      generalProductSearch(search.toString(), signal)
        .then((result:FetchApiResponse<{ products:ProductUser[] }> | ErrorResponse) => {
          if (hasFetchSucceeded(result)) {
            dispatch(addProducts(result.message.products));
            setSearch(search);
          }
        })
        .catch((e) => {
          setSearchError((e as Error).message);
        });
    }

    return () => abortSignal.abort();
  }, [dispatch, search, setSearch]);
  return { searchError };
};

export default useSearchProducts;
