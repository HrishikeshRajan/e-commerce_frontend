import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { ProtectedRouteProps } from '.';


function ProtectedRoute({ isAuthenticated, authenticationPath, outlet }:ProtectedRouteProps) {
  if (isAuthenticated) {
    return <Outlet />;
  }
  return (
    <Navigate to={{ pathname: authenticationPath }} />
  );
}

export default ProtectedRoute;
