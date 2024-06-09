import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './userContext';

const AdminPrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    // You can customize this part to show a loading spinner or a placeholder
    return <div>Loading...</div>;
  }


  if (!user || (!user.roles || (user.roles && !user.roles.includes('admin')))) {
    return <Navigate to="/admin/login" />;
  }
  return children;
  
};

export default AdminPrivateRoute;
