import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authValue, setAuthValue] = useState(null);
  return (
    <AuthContext.Provider value={{ authValue, setAuthValue }}>
      {children}
    </AuthContext.Provider>
  );
};
