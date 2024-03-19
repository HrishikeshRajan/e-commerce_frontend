import React, { useEffect } from 'react';
import {
  Navigate, useNavigate,
} from 'react-router-dom';

import { isEmpty } from 'lodash';

import AuthHelper from '@/components/auth/apis/helper';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '@/utils/reduxSlice/appSlice';
import useFetchUser from '@/hooks/user/useFetchUser';
import { IsLoggedIn, ProtectedRouteProps } from '../components/auth';
import { useTypedSelector } from '../hooks/user/reduxHooks';

/** *
 * This middleware is deprecated use AuthWrapper instead
 * @deprecated
 */
export function ProtectedRoute({ authenticationPath, outlet }:ProtectedRouteProps) {
  const app = useTypedSelector((store) => store.app);
  if (app.authenticated) {
    return outlet;
  }
  return (
    <Navigate to={{ pathname: authenticationPath }} />
  );
}

/** *
 * This middleware is deprecated use RedirectIfAuthenticated instead
 * @deprecated
 */
export function RedirectIfUserExists({ outlet }:IsLoggedIn) {
  const app = useTypedSelector((store) => store.app);
  if (app.authenticated) {
    return <Navigate to="/" />;
  }
  return (outlet);
}

export interface AuthWrapper {
  children:React.JSX.Element
  authentication:boolean
}

// Allows only the authenticated users
export const AuthenticationWrapper = ({
  children,
  authentication = true,
}:AuthWrapper):React.JSX.Element | string => {
  const userRedux = useTypedSelector((store) => store.app.user);
  const user = AuthHelper.getUserFromLocalStorage();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const {
    isUserFetching, isUserfetchError, setIsUserFetchEnable, newUser,
  } = useFetchUser();
  useEffect(() => {
    // compares the condition and current user status

    if (authentication && isEmpty(user)) {
      setIsUserFetchEnable(true);
      if (isUserfetchError === 'login') {
        AuthHelper.clearSignedOnData(() => {
          dispatch(removeUser());
          navigate('/auth');
        });
      }
      if (newUser) {
        AuthHelper.add(newUser);
        dispatch(addUser(newUser));
      }
    } else if (isEmpty(userRedux) && !isEmpty(user)) {
      dispatch(addUser(user));
    }
    setLoading(false);
  }, [user,
    navigate,
    authentication,
    userRedux,
    dispatch,
    setIsUserFetchEnable,
    newUser,
    isUserfetchError,
    isUserFetching]);

  return loading ? 'Loading' : children;
};
// Page loader animation here

// Prevents signedin users from accessing auth pages
export const RedirectIfAuthenticated = ({
  children,
  authentication = true,
}:AuthWrapper):React.JSX.Element | string => {
  const user = useTypedSelector((store) => store.app.user);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
  // compares the condition and current user status
    if (!authentication && !isEmpty(user)) {
      navigate('/');
    }
    setLoading(false);
  }, [user, navigate, authentication]);

  return loading ? 'Loading' : children;
};
