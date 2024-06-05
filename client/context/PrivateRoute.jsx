import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './userContext';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);


  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
