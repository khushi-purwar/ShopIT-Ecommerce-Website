import React from 'react';
import {Navigate } from 'react-router-dom';
import {useSelector} from 'react-redux';

const ProtectedRoute = ({children, isAdmin}) => {
   
    const { loading, user, isAuthenticated} =  useSelector(state => state.auth)
  
    if (loading===false && isAuthenticated===true) {
        if (isAdmin === true && user.role !== "Admin") {
            return <Navigate to="/" />;
        }
        return children;
    } else {
        return <Navigate to={"/login"} />;
    }
  
}

export default ProtectedRoute;
