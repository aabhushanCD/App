import React, { useContext, useState, createContext } from "react";
import { ServerApi } from "../constants.js";
import { toast } from "sonner";

import axios from "axios";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("user") || null
  );
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const me = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${ServerApi}/auth/me`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setCurrentUser(res.data.user);
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  const login = async (input) => {
    setLoading(true);
    try {
      const res = await axios.post(`${ServerApi}/auth/login`, input);
      if (res.status === 200) {
        setCurrentUser(res.data.user);
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  const register = async (input) => {
    setLoading(true);
    try {
      const res = await axios.post(`${ServerApi}/auth/register`, input);
      if (res.status === 200) {
        toast("Successfully signup");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      const res = await axios.post(`${ServerApi}/auth/logout`, {
        withCredentials: true,
      });
      if (res.data) {
        localStorage.removeItem("user");
      }
      setCurrentUser(null);
    } catch (error) {}
  };
  return (
    <div>
      <AuthContext.Provider
        value={{ isLoading, error, me, login, register, logout, currentUser }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export const useAuth = () => useContext(AuthContext);
