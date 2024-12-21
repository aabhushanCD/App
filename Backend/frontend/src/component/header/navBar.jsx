import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ padding: "0.5rem 0", marginBottom: "0.2rem" }}
    >
      <Toolbar>
        {/* Logo Section */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          color="inherit"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          MyApp
        </Typography>

        {/* Navigation Buttons */}
        <Box>
          <Button
            color="inherit"
            sx={{ margin: "0 0.5rem" }}
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            color="inherit"
            sx={{ margin: "0 0.5rem" }}
            component={Link}
            to="/about-us"
          >
            About Us
          </Button>
          <Button
            color="inherit"
            sx={{ margin: "0 0.5rem" }}
            component={Link}
            to="#"
          >
            Contact
          </Button>
          <Button
            color="inherit"
            sx={{ margin: "0 0.5rem" }}
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="outlined"
            sx={{
              margin: "0 0.5rem",
              color: "#fff",
              borderColor: "#fff",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
            }}
            component={Link}
            to="/signup"
          >
            SignUp
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
