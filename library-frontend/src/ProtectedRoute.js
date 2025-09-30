import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // 1. Periksa token di localStorage
  const isAuthenticated = localStorage.getItem("token");
  if (isAuthenticated) {
    return children;
  }
  return <Navigate to="/" replace />;

  return <div></div>;
};

export default ProtectedRoute;
