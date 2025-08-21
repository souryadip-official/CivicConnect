// src/components/ProtectedRoute.js

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { userInfo } = useContext(AuthContext);

  // 1. If the user is not logged in at all, always redirect to the login page.
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // 2. If this route is for admins only, but the logged-in user is NOT an admin.
  if (adminOnly && userInfo.role !== 'admin') {
    // Redirect them to their correct (user) dashboard.
    return <Navigate to="/dashboard" replace />;
  }

  // 3. If this route is for regular users, but the logged-in user IS an admin.
  if (!adminOnly && userInfo.role !== 'user') {
    // Redirect them to their correct (admin) dashboard.
    return <Navigate to="/admin/dashboard" replace />;
  }

  // 4. If none of the above conditions are met, the user has the correct role.
  // Render the requested component (e.g., DashboardPage or AdminDashboardPage).
  return <Outlet />;
};

export default ProtectedRoute;