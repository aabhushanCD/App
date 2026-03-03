import React, { memo, useState } from "react";
import { X } from "lucide-react";

import Comment from "../../comment/CommentSection";

import { useAuth } from "@/features/auth/authContext";
import PostHead from "./Post/PostHead";
import PostContent from "./Post/PostContent";
import PostLikeCommentCount from "./Post/PostLikeCommentCount";
import PostAction from "./Post/PostAction";
import { getAllComments } from "@/features/comment/comment.service";

const Post = ({ post, handlePostDelete, updatePostCommentCount }) => {
  const { currentUser } = useAuth();
  const [likes, setLikes] = useState(post.likes);

  const [comments, setComments] = useState(null);
  const [showCommentBox, setShowCommentBox] = useState(false);

  // 🔹 Lock/unlock scroll when modal opens/closes

  const handleCloseModal = () => {
    setShowCommentBox(false);
  };
  const handleFetchComments = async () => {
    if (showCommentBox) return setShowCommentBox(false);
    try {
      setShowCommentBox(true);
      setComments(null);
      const res = await getAllComments(post._id);
      if (res.status === 200) {
        setComments(res.data.comments);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="relative">
      <div className="flex flex-col  rounded-sm bg-white shadow-sm">
        {/* header */}
        <PostHead
          currentUser={currentUser}
          post={post}
          handlePostDelete={handlePostDelete}
        />
        {/* content */}
        <PostContent post={post} />
        {/* likes/comments count */}
        <PostLikeCommentCount
          currentUser={currentUser}
          post={post}
          likes={likes}
        />
        {/* actions */}
        <PostAction
          likes={likes}
          currentUser={currentUser}
          setLikes={setLikes}
          post={post}
          setComments={setComments}
          handleFetchComments={handleFetchComments}
        />
      </div>

      {/* 🔹 Comment Modal */}
      {showCommentBox && (
        <div
          className="bg-black/50 z-50"
          onClick={handleCloseModal} // close when clicking outside
        >
          <div
            className="bg-white shadow-lg w-full max-h-[90vh] overflow-auto p-4"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <div className="flex justify-between items-center border-b  pb-2 mb-4">
              <h2 className="text-lg font-semibold">Comments</h2>
              <X
                className="cursor-pointer hover:text-red-500"
                onClick={handleCloseModal}
              />
            </div>
            {comments === null ? (
              <div className="text-center py-6 ">Loading comments... </div>
            ) : (
              <Comment
                postId={post._id}
                serverComment={post.comments}
                handleFetchComments={handleFetchComments}
                comments={comments}
                setComments={setComments}
                updatePostCommentCount={updatePostCommentCount}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Post);
