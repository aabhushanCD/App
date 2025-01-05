import { Alert, dialogClasses, Icon } from "@mui/material";
import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import "./post.css";
const PostMenu = ({ postId }) => {
  const [error, setError] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [success, setSuccess] = useState(null);
  const Toggle = () => setToggle((prev) => !prev);
  const handleMenuClick = (event) => {
    Toggle();
    console.log(postId);
  };
  const deleteApi = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/post/deletePost",
        {
          method: "DELETE",
          body: JSON.stringify({ postId }),
        }
      );
      if (!response.ok) {
        throw new Error(setError(response.message) || "cannot delete post");
      }
      setSuccess(await response.message);
      Toggle();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Icon>
        <CiMenuKebab
          onClick={(event) => handleMenuClick(event)}
          style={{ position: "relative" }}
        />
        {toggle && (
          <>
            <div className="menu-container">
              <button className="btn" onClick={deleteApi}>
                Delete
              </button>
              <button className="btn">Edit</button>
              <button className="btn">Option2</button>
            </div>
            <Alert>{success}</Alert>
            {error && (
              <Alert severity="error" sx={{ position: "absolute" }}>
                {error}
              </Alert>
            )}
          </>
        )}
      </Icon>
    </div>
  );
};

export default PostMenu;
