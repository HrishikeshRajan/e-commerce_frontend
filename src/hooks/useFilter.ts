import { ProductBaseUrl } from '@/components/marketplace/urlConstants';
import { useEffect, useState } from 'react';

type Filter = { filter:{ brands:string[], colors:string[] } };
async function getFilterOptions(signal:AbortSignal) {
  try {
    const response = await fetch(ProductBaseUrl('filter_menu'), { signal });
    const filter = await response.json();
    return filter;
  } catch (error:any) {
    if (error.name === 'AbortError') return;
    console.log(error);
  }
}
const useFilter = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<Filter>({ filter: { brands: [], colors: [] } });
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    try {
      getFilterOptions(signal).then((response) => {
        setLoading(false);
        if (response) {
          setFilter(response.message);
        }
      });
    } catch (err) {
      setError(true);
      console.log(err);
    }
    return () => abortController.abort();
  }, []);

  return { filter: filter.filter, loading, error };
};

export default useFilter;
