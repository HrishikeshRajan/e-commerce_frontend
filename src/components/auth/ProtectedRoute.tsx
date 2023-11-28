import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { IsLoggedIn, ProtectedRouteProps } from '.';
import { useTypedSelector } from '../../hooks/user/reduxHooks';

function ProtectedRoute({ isAuthenticated, authenticationPath, outlet }:ProtectedRouteProps) {
  if (isAuthenticated && Object.keys(isAuthenticated).length > 1) {
    return outlet;
  }
  return (
    <Navigate to={{ pathname: authenticationPath }} />
  );
}

export function RedirectIfUserExists({ outlet }:IsLoggedIn) {
  const navigate = useNavigate();
  const app = useTypedSelector((store) => store.app);

  if (app.authenticated) {
    return navigate(-1);
  }
  return (outlet);
}

export default ProtectedRoute;
