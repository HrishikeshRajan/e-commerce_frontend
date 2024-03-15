/* eslint-disable import/no-cycle */
import { ClientCart } from '@/types/Cart';
import { useEffect, useState } from 'react';
import { addMyOrders } from '@/utils/reduxSlice/orderSlice';
import { useTypedDispatch } from './user/reduxHooks';

export interface Order {
  userId: string
  cartId: ClientCart
  shippingAddress: any
  paymentDetails: any
  orderDetails: any
  orderedAt:string
  orderId:string
  _id:string
}

const headers = new Headers();
headers.append('Content-Type', 'application/json');

const useOrders = () => {
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

    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/orders/list`, requestOptions)
      .then((result) => result.json())
      .then((result) => {
        setLoading(false);
        dispatch(addMyOrders(result.message.orders));
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

export default useOrders;
