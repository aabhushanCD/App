import { useAuth } from "@/hooks/useAuth";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { currentUser, me } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      console.log("checked auth");
      await me(); // check session
      setChecked(true); // allow render after check
    };

    checkUser();
  }, []);

  // Wait until auth check finishes
  if (checking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  // Not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
