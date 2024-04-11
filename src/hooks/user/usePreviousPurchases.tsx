import { getAllOrders } from '@/components/home/api/getAllOrder';
import { ProductUser } from '@/components/products/types';
import { useState, useEffect } from 'react';
import { useTypedSelector } from './reduxHooks';

const usePreviousPurchases = () => {
  const [loadingOrders, setLoadingOrders] = useState<boolean>(true);
  const [orders, setOrders] = useState<ProductUser[]>();
  const [errorOrders, setErrorOrders] = useState<string>();
  const user = useTypedSelector((store) => store.app.user);
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    if (user) {
      getAllOrders(signal)
        .then((result) => {
          setOrders(result.message.orders);
        })
        .catch((err) => {
          setLoadingOrders(false);
          setErrorOrders((err as Error).message);
        });
    }
    return () => {
      abortController.abort();
    };
  }, [user]);

  return { orders, loadingOrders, errorOrders };
};

export default usePreviousPurchases;
