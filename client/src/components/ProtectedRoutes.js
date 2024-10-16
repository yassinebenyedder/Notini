import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ element }) => {
  const [cookies] = useCookies(['access_token']);

  if (!cookies.access_token) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }
  // If authenticated, render the protected component
  return element;
};

export default ProtectedRoute;
