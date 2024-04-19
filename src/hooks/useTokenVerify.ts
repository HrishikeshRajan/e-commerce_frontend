import { verifyEmail } from '@/components/auth/apis/verifyEmail';
import { ErrorResponse, FetchApiResponse, hasFetchSucceeded } from '@/types/Fetch';
import { useEffect, useState } from 'react';

export const useTokenVerify = (search:URLSearchParams) => {
  const [response, setResponse] = useState<{ message:string, meta:string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [verifyError, setVerifyError] = useState<string>('');

  useEffect(() => {
    verifyEmail(search.get('token')!).then((result:FetchApiResponse<{ message:string, meta:string }> | ErrorResponse) => {
      setLoading(false);
      if (hasFetchSucceeded(result)) {
        setResponse({ message: result.message.message, meta: result.message.meta });
      } else {
        setVerifyError(result.error);
      }
    }).catch((err) => {
      setLoading(false);
      setVerifyError((err as Error).message);
    });
  }, [search]);
  return [response, loading, verifyError] as const;
};
