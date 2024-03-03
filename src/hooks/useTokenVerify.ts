import { verifyEmail } from '@/components/auth/apis/verifyEmail';
import { StatusCodes } from 'http-status-codes';
import { useEffect, useState } from 'react';

type ErrorMessage = { error:boolean, message:string };
export const useTokenVerify = (search:URLSearchParams) => {
  const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<ErrorMessage>({ error: false, message: '' });

  useEffect(() => {
    try {
      verifyEmail(search.get('token')!).then((result):any => {
        setLoading(false);

        if (result.success && result.statusCode === StatusCodes.ACCEPTED) {
          setResponse(result.message);
        } else {
          throw new Error(result.message.error);
        }
      }).catch((err) => {
        setLoading(false);
        setIsError({ error: true, message: err.message });
      });
    } catch (error:any) {
      setLoading(false);
      setIsError({ error: true, message: 'We\'re unable to process your token verification request. Please try again later.' });
    }
  }, [search]);
  return [response, loading, isError] as const;
};
