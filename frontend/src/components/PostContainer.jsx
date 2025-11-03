import React, { useState } from "react";
import { ServerApi } from "../constants.js";
import Post from "./Post";
import axios from "axios";
import { toast } from "sonner";

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
      toast.error(error.response?.data?.message);
    }
  };
  const updatePostCommentCount = (postId, delta) => {
    setPostData((prev) => {
      const updatedPosts = prev.posts.map((post) => {
        if (post._id === postId) {
          const currentCount = post.comments?.length ?? 0;
          return {
            ...post,
            comments: Array(currentCount + delta).fill({}), // just to make length update
          };
        }
        return post;
      });
      return { ...prev, posts: updatedPosts };
    });
  };
  return (
    <div className="  ">
      {postsData?.posts?.length > 0 && (
        <div className="flex flex-col gap-4  ">
          {postsData.posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              handlePostDelete={handlePostDelete}
              updatePostCommentCount={updatePostCommentCount}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostContainer;
