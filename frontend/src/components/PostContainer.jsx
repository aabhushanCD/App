import React, { useState } from "react";
import { ServerApi } from "../constants.js";
import Post from "./Post";
import axios from "axios";

const PostContainer = ({ postsData, setPostData }) => {
  const handlePostDelete = async (postId) => {
    try {
      const res = await axios.delete(
        `${ServerApi}/post/deletePost/${postId}`,

        { withCredentials: true }
      );
      if (res.status === 200) {
        const newData = postsData.posts.filter((post) => {
          return post._id != postId;
        });
        setPostData((prev) => ({ ...prev, posts: newData }));
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className=" mt-4 ">
      {postsData?.posts?.length > 0 && (
        <div className="flex flex-col gap-4  ">
          {postsData.posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              handlePostDelete={handlePostDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostContainer;
