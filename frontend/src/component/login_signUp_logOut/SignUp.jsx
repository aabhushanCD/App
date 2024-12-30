import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Alert,
} from "@mui/material";
import Navbar from "../header/navBar";
import Footer from "../footer/Footer";
const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    acceptTerms: false,
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload
    try {
      const response = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const Data = await response.json();
      console.log("Response:", Data);

      // Update response message
      setIsSuccess(true);
      setResponseMessage(Data.message || "Registration successful!");
    } catch (error) {
      console.error("Error with POST request:", error);
      setIsSuccess(false);
      setResponseMessage("Error with registration. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 3,
            backgroundColor: "#f9f9f9",
            marginTop: 4,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Create an Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* First Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              {/* Last Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              {/* Email */}
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              {/* Password */}
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Grid>
              {/* Accept Terms */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      required
                    />
                  }
                  label="I accept the Terms and Conditions"
                />
              </Grid>
              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ padding: "0.8rem" }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
          {/* Response Message */}
          {responseMessage && (
            <Box mt={3}>
              <Alert severity={isSuccess ? "success" : "error"}>
                {responseMessage}
              </Alert>
            </Box>
          )}
        </Paper>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Signup;
