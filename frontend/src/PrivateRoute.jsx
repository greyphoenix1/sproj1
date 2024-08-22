import { Navigate } from "react-router-dom";
import React from "react";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    console.log("Token in PrivateRoute:", token);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;