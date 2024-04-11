import { getAllPromos } from '@/components/home/api/getAllPromos';
import { Promo } from '@/types/Promo';
import { useState, useEffect } from 'react';

const useFetchUserPromos = () => {
  const [loadingPromos, setLoadingPromos] = useState<boolean>(true);
  const [promos, setPromos] = useState<Promo[] | null>(null);
  const [errorPromos, setErrorPromos] = useState<string>();
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    getAllPromos(signal)
      .then((result) => {
        setLoadingPromos(false);
        setPromos(result.message.promos);
      })
      .catch((err) => {
        setLoadingPromos(false);
        setErrorPromos((err as Error).message);
      });
    return () => {
      abortController.abort();
    };
  }, []);

  return { promos, loadingPromos, errorPromos };
};

export default useFetchUserPromos;
