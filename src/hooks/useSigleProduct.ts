import { PRODUCT } from '@/utils/API';
import { useEffect, useState } from 'react';
import { ProductCore } from '@/types/Product';
import { addSingleProduct } from '@/utils/reduxSlice/productSlice';
import { useTypedDispatch } from './user/reduxHooks';

export const useSingleProduct = (productId:string) => {
  const [product, setProduct] = useState<ProductCore>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<{ error:boolean, message:string }>({ error: false, message: '' });
  const dispatch = useTypedDispatch();
  useEffect(() => {
    const controller = new AbortController();
    try {
      PRODUCT.get(`item/${productId}`, { signal: controller.signal }).then((result) => {
        setLoading(false);
        if (result.status === 200) {
          setProduct(result.data.message.product);
          dispatch(addSingleProduct(result.data.message.product));
        }
      }).catch((error:any) => {
        if (error.name !== 'CanceledError') {
          console.log(error);
        }

        setIsError({ error: true, message: error.message });
      });
    } catch (error:any) {
      if (error.name === 'CanceledError') return;
      setIsError({ error: true, message: error.message });
      console.log(error);
    }

    return () => controller.abort();
  }, []);
  return [product, loading, isError] as const;
};
