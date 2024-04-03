import { useState, useEffect } from 'react';
import { addToCart } from '@/utils/reduxSlice/cartSlice';
import { StatusCodes } from 'http-status-codes';
import { useTypedDispatch, useTypedSelector } from './user/reduxHooks';

async function getCartLatestCart(signal:AbortSignal) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/cart/latest`, {
      credentials: 'include',
      signal,
    });
    const cartData = await response.json();
    return cartData;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name !== 'AbortError') {
        throw new Error(error.message);
      }
    }
  }
}

const useFetchCart = (cart:boolean) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((store) => store.app.user);
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (!cart && (user && Object.values(user).length > 0)) {
      getCartLatestCart(signal).then((result) => {
        setLoading(false);
        if (!result) {
          return;
        }
        if (result.success && result.statuCode === StatusCodes.OK) {
          dispatch(addToCart(result.message.cart));
        }
      }).catch((err) => {
        setLoading(false);
        setError(err.message);
        console.log(`Error from useFetchCart Hook err ${err}`);
      });
    }
    return () => {
      abortController.abort();
    };
  }, [cart, dispatch, user]);

  return { loading, error };
};

export default useFetchCart;
