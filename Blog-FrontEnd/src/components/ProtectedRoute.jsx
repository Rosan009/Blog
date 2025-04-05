import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isTokenExpired } from '../utils/isTokenExpired ';


const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('token'); 
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
