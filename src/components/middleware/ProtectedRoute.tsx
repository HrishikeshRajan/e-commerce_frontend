import React, { useEffect } from 'react';
import {
  Navigate, useNavigate,
} from 'react-router-dom';
import { IsLoggedIn, ProtectedRouteProps } from '../auth';
import { useTypedSelector } from '../../hooks/user/reduxHooks';

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
  const isSignedIn = useTypedSelector((store) => store.app.authenticated);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
  // compares the condition and current user status
    if (authentication && !isSignedIn) {
      navigate('/auth');
    }
    setLoading(false);
  }, [isSignedIn, navigate, authentication]);

  return loading ? 'Loading' : children;
};

// Prevents signedin users from accessing auth pages
export const RedirectIfAuthenticated = ({
  children,
  authentication = true,
}:AuthWrapper):React.JSX.Element | string => {
  const isSignedIn = useTypedSelector((store) => store.app.authenticated);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
  // compares the condition and current user status
    if (!authentication && isSignedIn) {
      navigate('/');
    }
    setLoading(false);
  }, [isSignedIn, navigate, authentication]);

  return loading ? 'Loading' : children;
};
