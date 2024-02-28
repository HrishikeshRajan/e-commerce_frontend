/* eslint-disable import/no-cycle */
import { CartDocument } from '@/types/Cart';
import { useEffect, useState } from 'react';
import { addMyOrders } from '@/utils/reduxSlice/orderSlice';
import { useTypedDispatch } from './user/reduxHooks';

export interface Order {
  userId: string
  cartId: CartDocument
  shippingAddress: any
  paymentDetails: any
  orderDetails: any
  orderedAt:string
  orderId:string
  _id:string
}

const headers = new Headers();
headers.append('Content-Type', 'application/json');

const useOrdersByShop = () => {
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

    fetch('http://localhost:4000/api/v1/orders/list', requestOptions)
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

export default useOrdersByShop;