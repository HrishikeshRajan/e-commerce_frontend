import { useEffect, useState } from 'react';

import { getUser } from '@/components/auth/apis/getUser';
// import { addUser, confirmAuthentication } from '@/utils/reduxSlice/appSlice';
import { hasFetchSucceeded, isFetchUnauthorizedError } from '@/types/Fetch';
import { IUser } from '@/components/user';
import { useTypedDispatch } from './reduxHooks';

// if this error to make logot in client side
const useFetchUser = () => {
  const [isUserFetching, setIsUserFetching] = useState(true);
  const [isUserfetchError, setIsUserFetchError] = useState<string>();
  const [isUserFetchEnabled, setIsUserFetchEnable] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<IUser>();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    if (isUserFetchEnabled) {
      getUser(signal)
        .then((response) => {
          if (hasFetchSucceeded(response)) {
            setIsUserFetching(false);
            setNewUser(response.message.user);
          } else {
            setIsUserFetching(false);
            setIsUserFetchError(response.error);

            if (isFetchUnauthorizedError(response)) {
              setIsUserFetching(false);
              setIsUserFetchError('login');
            }
          }
        })
        .catch((err: unknown) => {
          setIsUserFetching(false);
          setIsUserFetchError((err as Error).message);
        });
    }

    return () => abortController.abort();
  }, [dispatch, isUserFetchEnabled, setIsUserFetchEnable]);

  return {
    isUserFetching,
    isUserfetchError,
    setIsUserFetchEnable,
    newUser,
  } as const;
};

export default useFetchUser;
