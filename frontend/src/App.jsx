import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import { AuthContext } from "./component/store/auth";
import Home from "./component/dashboard/home";
import { AuthContext } from "./component/store/auth";
import { AuthContextProvider } from "./component/login_signUp_logOut/Login";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#f4f6f8",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  const parsedUser = JSON.parse(localStorage.getItem("user"));
  console.log(parsedUser);
  setUser(parsedUser);

  const Api = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: true,
      });
      if (!response.ok) {
        throw new Error("some problem from server");
      }
    } catch (error) {
      console.error(error);
    }
    console.log(await response);
  };
  useEffect(() => {
    Api;
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
      <Home onLoad={Api}></Home>
    </>
  );
}
export default App;
