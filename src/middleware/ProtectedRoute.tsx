import React, { useEffect } from 'react';
import {
  useNavigate,
} from 'react-router-dom';

import AuthHelper from '@/components/auth/apis/helper';
import { useDispatch } from 'react-redux';
import { resetUser } from '@/utils/reduxSlice/appSlice';
// import useCookieStatus from '@/hooks/user/useCookieStatus';
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
  const token = AuthHelper.getTokenToLocal();
  // const { loadingStatus, tokenInfo } = useCookieStatus();
  useEffect(() => {
    if (authentication && !token) {
      AuthHelper.clearSignedOnData(() => {
        dispatch(resetUser());
        if (typeof window !== undefined) {
          window.location.href = '/auth';
        }
        // navigate('/auth');
      });
    }

    setLoading(false);
  }, [authentication, dispatch, navigate, token]);

  return loading ? <PageWaiting loading={loading} /> : children;
}
// Page loader animation here

// Prevents signedin users from accessing auth pages
export function RedirectIfAuthenticated({
  children,
  authentication = true,
}:AuthWrapper):React.ReactNode | string {
  const token = AuthHelper.getTokenToLocal();

  const navigate = useNavigate();
  // compares the condition and current user status
  useEffect(() => {
    if (!authentication && token) {
      navigate('/');
    }
  }, [authentication, navigate, token]);
  return children;
}
