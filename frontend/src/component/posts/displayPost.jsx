import React from "react";
import Navbar from "../header/navBar";
// import { format } from "date-fns";
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

const DisplayPost = ({ postData}) => {
  return (
    <>
      <ul style={{ listStyleType: "none" }}>
        {postData.map((post) => {
          return (
            <li key={post._id}>
              <Box sx={{ maxWidth: 600, margin: "auto", mt: 2 }}>
                {/* Post Card */}
                <Card>
                  {/* Header: User Info */}
                  <CardHeader
                    avatar={<Avatar aria-label="user-avatar">A</Avatar>}
                    title={`${post.Name}`}
                    subheader={post.createdAt.slice(0, 10)}
                  />

                  {/* Post Content */}
                  <CardContent>
                    <Typography variant="body1">{post.content}</Typography>
                    {post.image.match(/\.(jpeg|jpg|gif|png)$/) ? (
                      <img src={post.image} alt="image" width={"570px"}></img>
                    ) : (
                      <video
                        src={post.image}
                        alt="Video"
                        width={"570px"}
                        loading={true}
                        controls
                      ></video>
                    )}
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
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default DisplayPost;
