import React, { useContext, useEffect, useState, createContext } from "react";
import { toast } from "sonner";

import {
  loginApi,
  logOutApi,
  meApi,
  registerApi,
} from "@/features/auth/auth.service";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const validateUser = async () => {
      try {
        const res = await meApi();
        setCurrentUser(res.data.user);
      } catch (error) {
        console.error(error);
        setCurrentUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };
    validateUser();
  }, []);
  const login = async (credentials) => {
    try {
      setLoading(true);
      const res = await loginApi(credentials);
      setCurrentUser(res.data.user);

      toast.success("Login successful");
      return true;
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || error.message || "Login failed",
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    try {
      setLoading(true);
      const res = await registerApi(data);

      toast.success(res?.data?.message);
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logOutApi();
      setCurrentUser(null);
      return true;
    } catch (error) {
      toast.error(`${error.response?.data?.message}` || "Logout failed");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        login,
        register,
        logout,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
