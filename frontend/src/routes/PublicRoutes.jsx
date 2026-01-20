import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const { currentUser } = useAuth();

  // If logged in, block access to login/signup
  if (currentUser) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default PublicRoutes;
