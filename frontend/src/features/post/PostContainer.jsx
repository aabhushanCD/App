import React, { useEffect } from "react";
import { toast } from "sonner";
import Post from "@/features/post/components/Post";
import { deletePost, getPostPagenation } from "./postService";

const PostContainer = ({
  postsData,
  setPostData,
  setLoading,
  setHasMore,
  page,
}) => {
  useEffect(() => {
    const postFetch = async () => {
      try {
        setLoading(true);
        const res = await getPostPagenation(page);
        if (res.status === 200) {
          setPostData((prev) => ({
            ...prev,
            posts: [...(prev.posts || []), ...res.data.posts],
            hasMore: res.data.hasMore,
            totalPosts: res.data.totalPosts,
            userId: res.data.userId,
          }));

          setHasMore(res.data.hasMore);
        }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      } finally {
        setLoading(false);
      }
    };
    postFetch();
  }, [page]);

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
