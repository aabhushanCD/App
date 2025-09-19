import { useAuth } from "@/store/AuthStore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { currentUser, me, isLoading } = useAuth();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      await me(); // check session
      setChecked(true); // allow render after check
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (checked && !currentUser) {
      navigate("/login");
    }
  }, [checked, currentUser, navigate]);

  if (isLoading || !currentUser) {
    return <div>loading.........</div>;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
