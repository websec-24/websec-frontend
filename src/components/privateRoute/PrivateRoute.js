import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ children, roles }) => {
    const { currentUser } = useAuth();
    return roles.includes(currentUser.role) ? children : <Navigate to="/login" />;
};

export default PrivateRoute;


