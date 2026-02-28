import { useAuth } from "@/features/auth/authContext";
import { Loader } from "lucide-react";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { currentUser, isLoading } = useAuth();

  // Call me() once on mount

  // Show loader while checking session
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  // Not authenticated → redirect
  if (!currentUser && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated → show content
  return children;
};

export default ProtectedRoute;
