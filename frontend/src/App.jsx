import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  Typography,
  Alert,
  Box,
  Grid,
} from "@mui/material";

const CreatePostForm = () => {
  const [formData, setFormData] = useState({
    owner: "",
    image: "",
    video: "",
    share: false,
    content: "",
    likes: 0,
    deleted: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!formData.owner || !formData.content) {
      setError("Owner and Content are required fields.");
      return;
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 201) {
        setSuccess(data.message);
        setFormData({
          owner: "",
          image: "",
          video: "",
          share: false,
          content: "",
          likes: 0,
          deleted: false,
        });
        setError("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred while posting.");
    }
  };

  return (
    <Container
      maxWidth="md"
      style={{
        marginTop: "2rem",
        padding: "2rem",
        backgroundColor: "#e8f5e9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        style={{ color: "#2e7d32" }}
      >
        Create a Post
      </Typography>

      {error && (
        <Alert severity="error" style={{ marginBottom: "1rem" }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" style={{ marginBottom: "1rem" }}>
          {success}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Owner"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              margin="normal"
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Video URL"
              name="video"
              value={formData.video}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="share"
                  checked={formData.share}
                  onChange={handleChange}
                />
              }
              label="Share publicly"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{
                backgroundColor: "#2e7d32",
                color: "white",
                marginTop: "1rem",
              }}
            >
              Submit Post
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CreatePostForm;
