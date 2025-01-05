import React from "react";

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

import PostMenu from "./postMenu";
const DisplayPost = ({ postData }) => {
  return (
    <>
      <ul style={{ listStyleType: "none" }}>
        {postData.map((post, index) => {
          return (
            <li key={index}>
              <Box
                sx={{
                  margin: "auto",
                  mt: 2,
                  maxWidth: "500px",
                }}
              >
                {/* Post Card */}
                <Card>
                  {/* Header: User Info */}
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {" "}
                    <CardHeader
                      avatar={<Avatar aria-label="user-avatar">A</Avatar>}
                      title={`${post.Name}`}
                      subheader={post.createdAt.slice(0, 10)}
                    />
                    <PostMenu postId={post._id} />
                  </div>
                  {/* Post Content */}
                  <CardContent>
                    <Typography variant="body1">{post.content}</Typography>
                    {post.image.match(/\.(jpeg|jpg|gif|png)$/) ? (
                      <img
                        src={post.image}
                        alt="image"
                        style={{
                          maxWidth: "450px",
                          maxHeight: "630px",
                          margin: "auto",
                        }}
                      ></img>
                    ) : (
                      <video
                        src={post.image}
                        alt="Video"
                        width={"570px"}
                        controls
                        preload="none"
                        style={{ maxWidth: "450px" }}
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
