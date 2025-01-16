import React, { useContext, useRef, useState } from "react";

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
import axios from "axios";
import { ThumbUp, Comment, Share } from "@mui/icons-material";
import { AuthContext } from "../store/auth";
import PostMenu from "./PostMenu";
const DisplayPost = ({ postData }) => {
  const [likeData, setLikeData] = useState();
  const refLike = useRef(null);
  const { authValue } = useContext(AuthContext);
  const handleLike = async (post) => {
    try {
      const response = await axios.post("http://localhost:8000/api/post/like", {
        postId: post,
        userId: authValue.id,
      });

      setLikeData(response);
    } catch (error) {
      console.error("error Cannot like the post from frontend", error.message);
    }
  };
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
                    {/* post ko 3 dot menu ho yo */}
                    {authValue && (
                      <PostMenu postId={post._id} ownerId={authValue.id} />
                    )}
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
                      ref={refLike}
                      onClick={() => handleLike(post._id)}
                    >
                      {likeData.totalLikes}
                    </Button>
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
