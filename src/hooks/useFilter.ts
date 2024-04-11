import { getSidebarOptions } from '@/components/home/api/getSidebarOptions';
import { FilterBoxItem } from '@/components/home/sidebar/options';
import {
  ErrorResponse, FetchApiResponse, hasFetchSucceeded,
} from '@/types/Fetch';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useFilter = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState<Array<FilterBoxItem>>();

  const [search] = useSearchParams();
  const category = search.get('category');
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    try {
      getSidebarOptions(signal, category || '')
        .then((response:FetchApiResponse<{ filters:Array<FilterBoxItem> }> | ErrorResponse) => {
          setLoading(false);
          if (hasFetchSucceeded(response)) {
            setFilters(response.message.filters);
          }
        });
    } catch (err) {
      setError(true);
    }
    return () => {
      abortController.abort();
    };
  }, [category]);

  return { filter: filters, loading, error };
};

export default useFilter;
