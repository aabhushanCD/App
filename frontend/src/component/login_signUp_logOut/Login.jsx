import {
  Grid,
  Button,
  TextField,
  Container,
  Typography,
  Alert,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import Navbar from "../header/navBar";
import Footer from "../footer/Footer";
import { AuthContext } from "../store/auth";
import { useNavigate } from "react-router-dom";
function Login() {
  const { setAuthValue } = useContext(AuthContext);
  const [fieldData, setFieldData] = useState({ email: "", password: "" });
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldData({
      ...fieldData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Basic Validation
    if (!fieldData.email || !fieldData.password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: fieldData.email,
          password: fieldData.password,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        const errorMessage =
          responseData?.message ||
          "Login failed. Please check your credentials.";
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      setAuthValue(responseData.user);
      setData(responseData);

      // localStorage.setItem("user", JSON.stringify(responseData.user));
      setTimeout(() => navigate("/"), 980);
    } catch (error) {
      setError(error.message || "something went wrong!");
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ border: "1px solid black" }}>
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Enter Email"
                variant="outlined"
                fullWidth
                value={fieldData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Enter Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={fieldData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {/* <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton> */}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>

        <Box mt={2}>
          {/* Error Alert */}
          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          {/* Success Message */}

          {data && (
            <Alert severity="success">
              {data.message} WelCome {data.user.firstName}!
            </Alert>
          )}
        </Box>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default Login;

export const AuthContextProvider = ({ children }) => {
  const [authValue, setAuthValue] = useState(null);
  return (
    <AuthContext.Provider value={{ authValue, setAuthValue }}>
      {children}
    </AuthContext.Provider>
  );
};
