import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import AuthHelper from '../../components/auth/apis/helper';

import { useTypedSelector } from './reduxHooks';

// This hook syncs the redux data with local storage
export const useUpdateLocalStore = () => {
  const user = useTypedSelector((store) => store.app.user);

  useEffect(() => {
    if (!(isEmpty(user))) {
      AuthHelper.updateAuthenticatedUserData(user);
    }
  }, [user]);
};
