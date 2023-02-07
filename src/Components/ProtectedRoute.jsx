import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../Auth/AuthService";
import { UserContext } from "../Auth/UserContext";

const ProtectedRoute = ({ children }) => {
  const user = isAuthenticated();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};

const IsLogin = ({ children }) => {
  const user = isAuthenticated();
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children ? children : <Outlet />;
};

export { ProtectedRoute, IsLogin };
