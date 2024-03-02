import { useEffect, useState } from 'react';

import { StatusCodes } from 'http-status-codes';
import { getUser } from '@/components/auth/apis/getUser';
import { addUser, confirmAuthentication } from '@/utils/reduxSlice/appSlice';
import { isEmpty } from 'lodash';
import { useTypedDispatch, useTypedSelector } from './reduxHooks';

const useFetchUser = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((store) => store.app.user);
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (!user || isEmpty(user)) {
      getUser(signal)
        .then((response: any) => {
          if (
            response
            && response.success
            && response.statusCode === StatusCodes.OK
          ) {
            setLoading(false);
            dispatch(confirmAuthentication(true));
            dispatch(addUser(response.message.user));
          } else {
            setLoading(false);
            setError(true);
            setError(response && response.message.err);
          }
        })
        .catch((e: unknown) => {
          console.log(e);
          setLoading(false);
          setError(true);
        });
    }

    return () => abortController.abort();
  }, [dispatch, user]);

  return {
    loading,
    error,
  };
};

export default useFetchUser;
