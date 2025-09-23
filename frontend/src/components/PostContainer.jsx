import React, { useState } from "react";
import { ServerApi } from "../constants.js";
import Post from "./Post";
import axios from "axios";

const PostContainer = ({ serverRecived, setPostData }) => {
  const handlePostDelete = async (postId) => {
    try {
      const res = await axios.delete(
        `${ServerApi}/post/deletePost/${postId}`,

        { withCredentials: true }
      );
      if (res.status === 200) {
        const newData = serverRecived.posts.filter((posts) => {
          return posts._id !== postId;
        });
        setPostData(newData);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className=" w-[520px] mt-4 ">
      {serverRecived?.posts?.length > 0 && (
        <div className="flex flex-col gap-4  ">
          {serverRecived.posts.map((post) => (
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
