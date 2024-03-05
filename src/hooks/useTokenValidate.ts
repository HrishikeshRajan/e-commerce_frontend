/* eslint-disable max-len */
import { verifyToken } from '@/components/auth/apis/verifyToken';
import { StatusCodes } from 'http-status-codes';
import { merge } from 'lodash';
import { useEffect, useState } from 'react';

type ErrorMessage = { error:boolean, message:string };
type TokenValidateProps = {
  search:URLSearchParams
  path:string
  urlKey:string
  tokenKey:string

};
type TokenValidateApi = Omit<TokenValidateProps, 'search' | 'urlKey'> & { token:string };
type TokenValidateResponse = [ response:any, loading:boolean, error:ErrorMessage ];
/**
 * Custom hook to validate token from URL search parameters.
 * @param {Object} options - Options object.
 * @param {URLSearchParams} options.search - The URLSearchParams object containing the search parameters.
 * @param {string} options.path - The path to check for token.
 * @param {string} options.tokenKey - The key to look for in search parameters to retrieve the token.
 * @returns {void}
 */
export const useTokenValidate = (data:TokenValidateProps):TokenValidateResponse => {
  const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<ErrorMessage>({ error: false, message: '' });

  useEffect(() => {
    try {
      const token = data.search.get(data.urlKey);
      merge(data, { token });
      verifyToken(data as unknown as TokenValidateApi).then((result):any => {
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
  }, [data]);
  return [response, loading, isError];
};
