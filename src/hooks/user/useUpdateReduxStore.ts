import { useEffect } from 'react';
import AuthHelper from '../../components/auth/apis/helper';
import { addUser, confirmAuthentication } from '../../utils/reduxSlice/appSlice';
import { useTypedDispatch } from './reduxHooks';

export const useUpdateReduxStore = () => {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    const data = AuthHelper.isSignedOn();
    if (data && Object.keys(data).length > 1) {
      dispatch(addUser(data));
      dispatch(confirmAuthentication(true));
    }
  }, []);
};
