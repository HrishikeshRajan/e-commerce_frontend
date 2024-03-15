import { getSale } from '@/components/flashsale/api/get';
import { ErrorMessage, IResponse } from '@/types/Fetch';
import { IFlashSale } from '@/types/Sale';
import { useEffect, useState } from 'react';
import { addFlashSaleItem } from '@/utils/reduxSlice/appSlice';
import { useTypedDispatch } from './user/reduxHooks';

interface Success extends IResponse {
  message: {
    sale: IFlashSale;
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
  return (response as Success).message.sale !== undefined;
}

const useFlashSale = () => {
  const [response, setResponse] = useState<IFlashSale>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<ErrorMessage>({
    error: false,
    message: '',
  });

  const dispatch = useTypedDispatch();
  useEffect(() => {
    getSale()
      .then((result: Response) => {
        setLoading(false);
        if (isPromiseSuccess(result)) {
          setResponse(result.message.sale);
          dispatch(addFlashSaleItem(result.message.sale));
        } else {
          throw new Error(result.message.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        setIsError({ error: true, message: err.message });
      });
  }, []);
  return [response, loading, isError] as const;
};

export default useFlashSale;
