/* eslint-disable no-extra-boolean-cast */
import { useEffect } from 'react';
import AuthHelper from '../../components/auth/apis/helper';

import { useTypedSelector } from './reduxHooks';

// This hook syncs the redux data with local storage
export const useUpdateLocalStore = () => {
  const isLoggedIn = useTypedSelector((store) => store.app.authenticated);

  useEffect(() => {
    if (Boolean(isLoggedIn)) {
      AuthHelper.authenticate(true);
    } else if (!Boolean(isLoggedIn)) {
      AuthHelper.authenticate(false);
    }
  }, [isLoggedIn]);
};
