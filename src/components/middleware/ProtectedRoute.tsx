import React from 'react';
import {
  Navigate,
} from 'react-router-dom';
import { IsLoggedIn, ProtectedRouteProps } from '../auth';
import { useTypedSelector } from '../../hooks/user/reduxHooks';

function ProtectedRoute({ authenticationPath, outlet }:ProtectedRouteProps) {
  const app = useTypedSelector((store) => store.app);
  if (app.authenticated) {
    return outlet;
  }
  return (
    <Navigate to={{ pathname: authenticationPath }} />
  );
}

export function RedirectIfUserExists({ outlet }:IsLoggedIn) {
  const app = useTypedSelector((store) => store.app);
  if (app.authenticated) {
    return <Navigate to="/" />;
  }
  return (outlet);
}

export default ProtectedRoute;
