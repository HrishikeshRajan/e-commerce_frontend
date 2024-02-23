import { useEffect, useState } from 'react';
import { addShopList } from '@/utils/reduxSlice/markeplaceSlice';
import { useTypedDispatch } from './user/reduxHooks';

const headers = new Headers();
headers.append('Content-Type', 'application/json');

const useShops = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const requestOptions:RequestInit = {
      method: 'GET',
      headers,
      redirect: 'follow',
      credentials: 'include',
      signal,
    };

    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/seller/shops`, requestOptions)
      .then((result) => result.json())
      .then((result) => {
        setLoading(false);
        console.log(result.message);
        dispatch(addShopList(result.message));
      })
      .catch((err:any) => {
        setLoading(false);
        if (err.name === 'AbortError') {
          return;
        }

        setError(err.message);
      });

    return () => abortController.abort();
  }, []);

  return { loading, error };
};

export default useShops;
