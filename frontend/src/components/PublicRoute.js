// src/components/PublicRoute.js

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PublicRoute = () => {
  const { userInfo } = useContext(AuthContext);

  // If a user is logged in, check their role and redirect them to their correct dashboard
  if (userInfo) {
    return userInfo.role === 'admin'
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/dashboard" replace />;
  }

  // If no user is logged in, allow access to the page (e.g., Login, Register)
  return <Outlet />;
};

export default PublicRoute;