import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './userContext';

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    // You can customize this part to show a loading spinner or a placeholder
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default PublicRoute;
