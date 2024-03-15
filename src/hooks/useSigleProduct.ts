import { useEffect, useState } from 'react';
import { ProductCore } from '@/types/Product';
import { addSingleProduct } from '@/utils/reduxSlice/productSlice';
import { IResponse } from '@/types/Fetch';
import { getSingleProduct } from '@/components/home/SingleProduct/api/getSingleProduct.api';
import { useTypedDispatch } from './user/reduxHooks';

interface Success extends IResponse {
  message: {
    product: ProductCore;
  }
}
interface Error extends IResponse {
  message: {
    error: any;
  }
}

type Response = Success | Error;

/**
 *
 * @param response
 * @returns response of type Success
 */
function isPromiseSuccess(response: Response): response is Success {
  return (response as Success).message.product !== undefined;
}

export const useSingleProduct = (productId:string) => {
  const [product, setProduct] = useState<ProductCore>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<{ error:boolean, message:string }>({ error: false, message: '' });
  const dispatch = useTypedDispatch();
  useEffect(() => {
    const controller = new AbortController();

    getSingleProduct(productId).then((result: Response) => {
      setLoading(false);
      if (isPromiseSuccess(result)) {
        setProduct(result.message.product);
        dispatch(addSingleProduct(result.message.product));
      } else {
        throw new Error(result.message.error);
      }
    }).catch((error) => {
      setLoading(false);
      setIsError({ error: true, message: error.message });
    });

    return () => controller.abort();
  }, [dispatch, productId]);
  return [product, loading, isError] as const;
};
