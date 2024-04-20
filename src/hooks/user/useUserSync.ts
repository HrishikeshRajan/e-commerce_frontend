import AuthHelper from '@/components/auth/apis/helper';
import { useEffect } from 'react';
import { addUser } from '@/utils/reduxSlice/appSlice';
import { useTypedDispatch, useTypedSelector } from './reduxHooks';

const useUserSync = () => {
  const user = useTypedSelector((store) => store.app.user);
  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (!user || (user && user._id === undefined)) {
      const userData = AuthHelper.getUserFromLocalStorage();
      if (userData && userData._id) {
        dispatch(addUser(userData));
      }
    }
  }, [dispatch, user]);
};

export default useUserSync;
