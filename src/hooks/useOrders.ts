import { CartDocument } from '@/types/Cart';
import { useEffect, useState } from 'react';

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

const useOrders = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState<Order[]>();

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
        setOrders(result.message.orders);
      })
      .catch((err:any) => {
        if (err.name === 'AbortError') {
          return;
        }
        setLoading(false);
        setError(err.message);
      });
    return () => abortController.abort();
  }, []);

  return { loading, error, orders };
};

export default useOrders;
