// src/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth(); // Use Auth context
    const isAuthenticated = Boolean(user); // Determine if authenticated

    return (
        <Route {...rest} render={
            props => isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Navigate to="/login" replace />
            )
        } />
    );
};

export default ProtectedRoute;
