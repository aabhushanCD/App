import React, { useContext, useState } from "react";
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
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
      <Home></Home>
    </>
  );
}
export default App;
