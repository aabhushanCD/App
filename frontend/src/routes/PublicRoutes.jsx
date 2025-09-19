import { useAuth } from "@/store/AuthStore";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [navigate, currentUser]);

  return <>{children}</>;
};

export default PublicRoutes;
