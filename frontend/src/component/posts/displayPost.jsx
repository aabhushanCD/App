import React from "react";
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
          {(
            <Typography variant="body1">
              This is an example post in a Facebook-like wireframe!
            </Typography>
          ) && (
            <img
              src="https://scontent.fbir4-1.fna.fbcdn.net/v/t39.30808-6/471820505_976028054559091_3053653030562328936_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=3iP2Wvt8AZAQ7kNvgHSX-Ig&_nc_oc=AdiNKpEQTG201oMKpA6yXx0SKFGKc9lFavM-Dk70lCCR1LNb6oGBVPW10yM9Sx2YaXfPNrOvmZLa82Hzca8Mvqzx&_nc_zt=23&_nc_ht=scontent.fbir4-1.fna&_nc_gid=AUwFYKdc1RYAXpNAHwREzQ_&oh=00_AYB6etuJ73C2dae6E3DPpSrKDX71Qc7f264Plx8CWif_mA&oe=6771F206"
              alt=""
            />
          )}
        </CardContent>

        {/* Actions (Like, Comment, Share) */}
        <CardActions>
          <Button
            startIcon={<ThumbUp />}
            sx={{ flex: 1, justifyContent: "center" }}
          >
            Like
          </Button>
          <Button
            startIcon={<Comment />}
            sx={{ flex: 1, justifyContent: "center" }}
          >
            Comment
          </Button>
          <Button
            startIcon={<Share />}
            sx={{ flex: 1, justifyContent: "center" }}
          >
            Share
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default DisplayPost;
