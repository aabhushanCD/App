import React, { memo } from "react";
import { toast } from "sonner";
import Post from "@/features/post/components/Post";
import { deletePost } from "./postService";
const PostContainer = ({ postsData, setPostData }) => {
  const handlePostDelete = async (postId) => {
    try {
      const res = await deletePost(postId);
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

  // Update comment count for a single post
  const updatePostCommentCount = (postId, delta) => {
    setPostData((prev) => {
      const newPosts = prev.posts.map((post) => {
        if (post._id === postId) {
          // Only create a new object for the affected post
          return { ...post, commentCount: (post.commentCount ?? 0) + delta };
        }
        return post; // keep the same reference for unaffected posts
      });
      return { ...prev, posts: newPosts };
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

export default memo(PostContainer);
