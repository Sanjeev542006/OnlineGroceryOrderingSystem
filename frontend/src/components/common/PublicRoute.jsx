import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getRoleBasedRedirect } from '../../contexts/AuthContext';

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (user) {
    const redirectPath = getRoleBasedRedirect(user.role);
    return <Navigate to={redirectPath} replace />;
  }
  
  return children;
};

export default PublicRoute;