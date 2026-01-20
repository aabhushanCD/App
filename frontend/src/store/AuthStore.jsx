import React, { useContext, useState, createContext } from "react";
import { ServerApi } from "../constants.js";
import { toast } from "sonner";

import axios from "axios";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null),
  );
  const [isLoading, setLoading] = useState(false);

  const me = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${ServerApi}/auth/me`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setCurrentUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (error) {
      setCurrentUser(null);
      localStorage.removeItem("user");
      toast.error(`${error.response?.data?.message}` || `${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${ServerApi}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      if (res.status === 200) {
        setCurrentUser(res.data.user);
        toast.success(res?.data?.message);
        return true;
      }
    } catch (error) {
      toast.error(`${error.response?.data?.message}` || `${error.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${ServerApi}/auth/register`,
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      if (res.status === 200 || res.status === 201) {
       
        toast.success(res?.data?.message);
        return true;
      }
      return false;
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Registration failed",
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        `${ServerApi}/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      if (res.status === 200) {
        localStorage.removeItem("user");
        return true;
      }
      setCurrentUser(null);
    } catch (error) {
      toast.error(`${error.response?.data?.message}` || `${error.message}`);
      return false;
    }
  };

  // = io(`${SocketApi}`, {
  //   query: { userId: currentUser?.userId },
  //   withCredentials: true,
  // });

  return (
    <div>
      <AuthContext.Provider
        value={{
          isLoading,
          me,
          login,
          register,
          logout,
          currentUser,
          setCurrentUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export const useAuth = () => useContext(AuthContext);
