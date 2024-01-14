import { ShopBaseUrl } from '@/components/marketplace/urlConstants';
import { useEffect } from 'react';
import { addCategories } from '@/utils/reduxSlice/productSlice';
import { isEmpty } from 'lodash';
import { useTypedDispatch } from './reduxHooks';

/**
 * Fetches all category documents
 */
const useCategory = () => {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    async function getCategories() {
      try {
        const response = await fetch(`${ShopBaseUrl('categories')}`, {
          method: 'GET',
          credentials: 'include',
          signal,
        });
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    }

    getCategories().then((response) => {
      if (response && !isEmpty(response.message || !response.message.categories)) {
        dispatch(addCategories(response.message?.categories));
      }
    });

    return () => abortController.abort();
  }, []);
};

export default useCategory;
