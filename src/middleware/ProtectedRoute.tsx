import React, { useEffect } from 'react';
import {
  useNavigate,
} from 'react-router-dom';

import AuthHelper from '@/components/auth/apis/helper';
import { useDispatch } from 'react-redux';
import { resetUser } from '@/utils/reduxSlice/appSlice';
import useCookieStatus from '@/hooks/user/useCookieStatus';
import PageWaiting from '@/utils/animations/PageWaiting';

export interface AuthWrapper {
  children:React.JSX.Element
  authentication:boolean
}

// Allows only the authenticated users
export function AuthenticationWrapper({
  children,
  authentication = true,
}:AuthWrapper):React.ReactNode | string {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();

  const { loadingStatus, tokenInfo } = useCookieStatus();
  useEffect(() => {
    if (authentication && !loadingStatus && !tokenInfo) {
      AuthHelper.clearSignedOnData(() => {
        dispatch(resetUser());
        navigate('/auth');
      });
    }

    setLoading(false);
  }, [authentication, dispatch, loadingStatus, navigate, tokenInfo]);

  return loading ? <PageWaiting loading={loading} /> : children;
}
// Page loader animation here

// Prevents signedin users from accessing auth pages
export const RedirectIfAuthenticated = ({
  children,
  authentication = true,
}:AuthWrapper):React.ReactNode | string => {
  const { tokenInfo } = useCookieStatus();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
  // compares the condition and current user status
    if (!authentication && tokenInfo) {
      navigate('/');
    }
    setLoading(false);
  }, [navigate, authentication, tokenInfo]);

  return loading ? 'Loading' : children;
};
