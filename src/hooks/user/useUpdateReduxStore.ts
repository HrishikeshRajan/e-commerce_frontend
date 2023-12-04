import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHelper from '../../components/auth/apis/helper';
import {
  addUser, confirmAuthentication, removeAuthentication, removeUser,
} from '../../utils/reduxSlice/appSlice';
import { useTypedDispatch, useTypedSelector } from './reduxHooks';

export const useUpdateReduxStore = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const isSignedOn = useTypedSelector((store) => store.app.authenticated);
  useEffect(() => {
    const data = AuthHelper.isSignedOn();

    if (data && Object.keys(data).length > 1) {
      dispatch(addUser(data));
      dispatch(confirmAuthentication(true));
    }
    if (!data && isSignedOn) {
      AuthHelper.clearSignedOnData(() => {
        dispatch(removeUser());
        dispatch(removeAuthentication());
        navigate('/auth');
      });
    }
  }, []);
};
