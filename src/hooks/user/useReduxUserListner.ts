import AuthHelper from '@/components/auth/apis/helper';
import { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from './reduxHooks';

const useReduxUserAddressListner = () => {
  const userAdderess = useTypedSelector((store) => store.app.user?.address);
  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (userAdderess) {
      AuthHelper.updateLocalAddressState(userAdderess);
    }
  }, [dispatch, userAdderess]);
};

export default useReduxUserAddressListner;
