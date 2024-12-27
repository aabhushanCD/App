import React, { Children, createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [USER, setUser] = useState(null);
  return (
    <>
      <AuthContext.Provider value={{ USER, setUser }}>  
        {children}
      </AuthContext.Provider>
    </>
  );
}

