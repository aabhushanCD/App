import React, { useContext, useRef, useState } from "react";
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
import { AuthContext } from "../store/auth";
function Profile() {
  const { authValue } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [data, setData] = useState(null);
  const user = authValue;
  // const user = {
  //   name: "Aabhusan Dhakal",
  //   profilePicture: "https://via.placeholder.com/150", // Replace with actual URL
  //   coverPhoto: "https://via.placeholder.com/800x200", // Replace with actual URL
  //   address: "Dharan",
  //   contact: "9825376245",
  //   posts: [
  //     {
  //       id: 1,
  //       content: "Hello, this is my first post!",
  //       timestamp: "2025-01-03",
  //     },
  //     { id: 2, content: "Loving the weather today!", timestamp: "2025-01-02" },
  //   ],
  //   friends: ["John Doe", "Jane Smith", "Alice Johnson"],
  // };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async () => {
    const file = fileInputRef.current.files[0];

    const formData = new FormData();
    formData.append("owner", authValue.id);
    formData.append("profilePicture", file);

    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/user/profilePicture",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        return (error.message = "something went wrong");
      }
      setData(response);
    } catch (error) {
      return (error.message = "api error");
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <Navbar></Navbar>
      {/* Cover Photo and Profile Info */}
      <div style={{ position: "relative", textAlign: "center" }}>
        <button
          onClick={(event) => handleClick(event)}
          style={{ position: "absolute", bottom: "10px", left: "90%" }}
        >
          Edit cover Photo
        </button>

        <img
          name="coverPhoto"
          // src={user.coverPhoto}
          alt="Cover"
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {data && (
          <Avatar
            alt={user.firstName}
            src={data.profilePicture}
            onClick={handleClick}
            sx={{
              width: 100,
              height: 100,
              position: "absolute",
              bottom: "-50px",
              left: "calc(50% - 50px)",
              border: "3px solid white",
            }}
          />
        )}
      </div>

      <Typography variant="h5" align="center" sx={{ marginTop: "50px" }}>
        {user.firstName}
      </Typography>

      {/* Profile Content */}
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {/* Posts Section
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
        */}

        {/* Friends Section */}
        {/* <Grid item xs={12} md={4}>
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
        </Grid> */}
      </Grid>
    </>
  );
}

export default Profile;
