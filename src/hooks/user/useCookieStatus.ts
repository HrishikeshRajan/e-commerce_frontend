import { useEffect, useState } from 'react';

const useCookieStatus = () => {
  const [tokenInfo, setTokenInfo] = useState('');
  const [error, setError] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/users/authStatus/checkToken`, {
          method: 'GET',
          credentials: 'include',
        });
        return await response.json();
      } catch (err) {
        throw new Error('Unable to check user status');
      }
    };

    fetchToken().then((result) => {
      setLoadingStatus(false);
      setTokenInfo(result.status);
    }).catch((err) => {
      setLoadingStatus(false);
      if (err instanceof Error) {
        setError(err.message);
      }
    });

    return () => {
    };
  }, []);
  return { error, loadingStatus, tokenInfo };
};

export default useCookieStatus;
