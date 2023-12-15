import { useEffect } from 'react';
import AuthHelper from '../../components/auth/apis/helper';

import { useTypedSelector } from './reduxHooks';

// This hook syncs the redux data with local storage
export const useUpdateLocalStore = () => {
  const user = useTypedSelector((store) => store.app.user);

  useEffect(() => {
    if (user) {
      if (Object.values(user).length > 1) {
        AuthHelper.updateAuthenticatedUserData(user);
      }
    }
  }, [user]);
};
