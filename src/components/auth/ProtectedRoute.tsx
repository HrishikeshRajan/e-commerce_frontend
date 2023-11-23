import React from 'react';
import { Navigate } from 'react-router-dom';
import { ProtectedRouteProps } from '.';

function ProtectedRoute({ isAuthenticated, authenticationPath, outlet }:ProtectedRouteProps) {
  if (Object.keys(isAuthenticated).length > 1) {
    return outlet;
  }
  return (
    <Navigate to={{ pathname: authenticationPath }} />
  );
}

export default ProtectedRoute;
