import { useEffect, useState } from 'react';
import { addCategories } from '@/utils/reduxSlice/productSlice';
import { getCategories } from '@/components/home/api/getCategories';
import { useTypedDispatch } from './reduxHooks';

/**
 * Fetches all categories
 */
const useCategory = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const dispatch = useTypedDispatch();
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    getCategories(signal).then((response) => {
      setLoading(false);
      if (response && response.message.categories) {
        dispatch(addCategories(response.message.categories));
      }
    }).catch((err) => {
      setLoading(false);
      setError((err as Error).message);
      console.log(err);
    });

    return () => abortController.abort();
  }, [dispatch]);
  return [loading, error] as const;
};

export default useCategory;
