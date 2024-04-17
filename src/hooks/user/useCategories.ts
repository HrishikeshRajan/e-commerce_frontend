import { useEffect, useState } from 'react';
import { addCategories } from '@/utils/reduxSlice/productSlice';
import { getCategories } from '@/components/home/api/getCategories';
import { ErrorResponse, FetchApiResponse, hasFetchSucceeded } from '@/types/Fetch';
import { useTypedDispatch, useTypedSelector } from './reduxHooks';

/**
 * Fetches all categories
 */
const useCategory = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const dispatch = useTypedDispatch();
  const categories = useTypedSelector((store) => store.products.categories);
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    if (categories && categories.length < 1) {
      getCategories(signal)
        .then((response: FetchApiResponse<{ categories:[] }> | ErrorResponse) => {
          setLoading(false);
          if (hasFetchSucceeded(response)) {
            dispatch(addCategories(response.message.categories));
          }
        }).catch((err) => {
          setLoading(false);
          setError((err as Error).message);
        });
    }

    return () => abortController.abort();
  }, [categories, dispatch]);
  return [loading, error] as const;
};

export default useCategory;
