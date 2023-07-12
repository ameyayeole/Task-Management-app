import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('token') !== null; 
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Route element={element} />;
};

export default ProtectedRoute;
