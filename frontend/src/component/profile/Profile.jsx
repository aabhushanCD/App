import React from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from "@mui/material";
import Navbar from "../header/navBar";
function Profile() {
  const user = {
    name: "Aabhusan Dhakal",
    profilePicture: "https://via.placeholder.com/150", // Replace with actual URL
    coverPhoto: "https://via.placeholder.com/800x200", // Replace with actual URL
    address: "Dharan",
    contact: "9825376245",
    posts: [
      {
        id: 1,
        content: "Hello, this is my first post!",
        timestamp: "2025-01-03",
      },
      { id: 2, content: "Loving the weather today!", timestamp: "2025-01-02" },
    ],
    friends: ["John Doe", "Jane Smith", "Alice Johnson"],
  };

  const handleClick = (event) => {
    console.log(event);
  };

  return (
    <>
      {/* Navigation Bar */}
      <Navbar></Navbar>
      {/* Cover Photo and Profile Info */}
      <div style={{ position: "relative", textAlign: "center" }}>
        <img
          name="coverPhoto"
          src={user.coverPhoto}
          alt="Cover"
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
          onClick={(event) => handleClick(event)}
        />
        <Avatar
          alt={user.name}
          src={user.profilePicture}
          onClick={(event) => handleClick(event)}
          sx={{
            width: 100,
            height: 100,
            position: "absolute",
            bottom: "-50px",
            left: "calc(50% - 50px)",
            border: "3px solid white",
          }}
        />
      </div>

      <Typography variant="h5" align="center" sx={{ marginTop: "50px" }}>
        {user.name}
      </Typography>
      <Typography variant="body1" align="center">
        {user.address} | {user.contact}
      </Typography>

      {/* Profile Content */}
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {/* Posts Section */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            Posts
          </Typography>
          {user.posts.map((post) => (
            <Card key={post.id} sx={{ marginBottom: 2 }}>
              <CardHeader
                avatar={<Avatar alt={user.name} src={user.profilePicture} />}
                title={user.name}
                subheader={post.timestamp}
              />
              <CardContent>
                <Typography>{post.content}</Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Friends Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Friends
          </Typography>
          <Card>
            <CardContent>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {user.friends.map((friend, index) => (
                  <li key={index} style={{ marginBottom: "10px" }}>
                    <Avatar sx={{ marginRight: 2 }} />
                    {friend}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Profile;
