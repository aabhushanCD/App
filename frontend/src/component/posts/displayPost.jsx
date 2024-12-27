import React from "react";
import Navbar from "../header/navBar";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { ThumbUp, Comment, Share } from "@mui/icons-material";

const DisplayPost = () => {
  return (
    <>
      <Navbar></Navbar>
      <Box sx={{ maxWidth: 600, margin: "auto", mt: 3 }}>
        {/* Post Card */}
        <Card>
          {/* Header: User Info */}
          <CardHeader
            avatar={<Avatar aria-label="user-avatar">U</Avatar>}
            title="John Doe"
            subheader="Just now"
          />

          {/* Post Content */}
          <CardContent>
            <Typography variant="body1">
              This is an example post in a Facebook-like wireframe!
            </Typography>
            <img src={"Image"} alt="Image" />
          </CardContent>

          {/* Actions (Like, Comment, Share) */}
          <CardActions>
            <Button
              startIcon={<ThumbUp />}
              sx={{ flex: 1, justifyContent: "center" }}
            ></Button>
            <Button
              startIcon={<Comment />}
              sx={{ flex: 1, justifyContent: "center" }}
            ></Button>
            <Button
              startIcon={<Share />}
              sx={{ flex: 1, justifyContent: "center" }}
            ></Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default DisplayPost;
