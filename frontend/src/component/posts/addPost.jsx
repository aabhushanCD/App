import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import Navbar from "../header/navBar";
import { AuthContext } from "../store/auth";

const Posts = () => {
  // const { USER } = useContext(AuthContext);
  // Replace with dynamic owner data if needed
  const [content, setContent] = useState("");
  const { authValue, setAuthValue } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const handleIconClick = () => {
    fileInputRef.current.click(); // Simulates a click on the hidden file input
  };

  // local storage data
  // JSON.parse(localStorage.getItem("user"));

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log("Selected file:", selectedFile?.name);
  };

  const handlePostSubmit = async (event) => {
    let owner = authValue.id;
    event.preventDefault();
    setError(null); // Clear previous errors
    // setOwner = USER.id;
    if (!content.trim() || !fileInputRef) {
      setError(" cannot be empty.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("owner", owner);
      formData.append("content", content);
      if (file) {
        formData.append("file", file);
      }

      const response = await fetch("http://localhost:8000/api/post", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Post created:", result);

      // Reset form
      setContent("");
      setFile(null);
      fileInputRef.current.value = null; // Reset file input
    } catch (err) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <>
      <Navbar></Navbar>

      {authValue ? (
        <Box
          sx={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            width: "100%",
            maxWidth: "500px",
            margin: "0 auto",
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <form onSubmit={handlePostSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Create a Post
                </Typography>

                {error && (
                  <Typography variant="body2" color="error" gutterBottom>
                    {error}
                  </Typography>
                )}

                <TextField
                  name="content"
                  fullWidth
                  label="What's on your mind?"
                  variant="outlined"
                  multiline
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  InputProps={{
                    style: { maxHeight: "200px", overflowY: "auto" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <IconButton
                  onClick={handleIconClick}
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <AddPhotoAlternateIcon fontSize="large" />
                </IconButton>

                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                />

                {file && (
                  <Typography variant="body2" gutterBottom>
                    Selected file: {file.name}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ borderRadius: "8px", padding: "10px" }}
                >
                  Post
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      ) : (
        <Alert severity="error">
          {"Please Login First to Add post"}
          <Button variant="primary">
            <Link to="/login">Login</Link>
          </Button>
        </Alert>
      )}
    </>
  );
};

export default Posts;
