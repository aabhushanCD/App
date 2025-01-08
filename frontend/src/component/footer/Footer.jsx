import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        padding: "2rem 0",
        marginTop: "2rem",

        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              We are a company dedicated to providing the best solutions for
              your business needs. Our mission is to deliver excellence and
              innovation.
            </Typography>
          </Grid>

          {/* Links Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                Home
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              <Link
                to="/about"
                style={{ color: "white", textDecoration: "none" }}
              >
                About
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              <Link
                to="/services"
                style={{ color: "white", textDecoration: "none" }}
              >
                Services
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              <Link
                to="/contact"
                style={{ color: "white", textDecoration: "none" }}
              >
                Contact
              </Link>
            </Typography>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Email: dammardhakal426@gmail.com
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Phone: 9825376245
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Address: Sami chowk, Dharan-16, Nepal
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", marginTop: "2rem", opacity: 0.7 }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
