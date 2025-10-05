import React, { useState, useEffect } from "react";
import {
  Ellipsis,
  MessageCircle,
  MessageCircleIcon,
  Share2,
  ThumbsUp,
  X,
} from "lucide-react";
import axios from "axios";
import { ServerApi } from "@/constants";
import porfile from "../assets/profile.png";
import { useAuth } from "@/store/AuthStore";
import { Button } from "./ui/button";
import Comment from "./Comment";

const Post = ({ post, handlePostDelete, updatePostCommentCount }) => {
  const { currentUser } = useAuth();
  const [likes, setLikes] = useState(post.likes);
  const [isThreeDotOpen, setThreeDot] = useState(false);
  const [comments, setComments] = useState(null);
  const [showCommentBox, setShowCommentBox] = useState(false);

  // 🔹 Lock/unlock scroll when modal opens/closes
  useEffect(() => {
    if (showCommentBox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // cleanup
    };
  }, [showCommentBox]);

  useEffect(() => {
    post;
  }, [setComments]);
  const handleLike = async (postId) => {
    try {
      const res = await axios.put(
        `${ServerApi}/post/like_dislikePost/${postId}`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        setLikes(res.data.likes);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleThreeDot = () => {
    setThreeDot((isThreeDotOpen) => !isThreeDotOpen);
  };

  const handleFetchComments = async () => {
    setShowCommentBox(true); // just open
    try {
      const postId = post._id;
      const res = await axios.get(
        `${ServerApi}/post/getAllComments/${postId}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setComments(res.data.comments);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCloseModal = () => {
    setShowCommentBox(false);
  };

  const handleShare = () => {
    
  };
  return (
    <div className="relative">
      <div className="flex flex-col border rounded-lg bg-white shadow-sm">
        {/* header */}
        <div className="flex justify-between items-center border-b p-4">
          <div className="flex gap-2 items-center">
            <img
              src={post.creatorId?.imageUrl || porfile}
              alt="profile"
              width={50}
              className="rounded-full"
            />
            <span>
              <h1 className="font-semibold">{post.creatorId.name}</h1>
              <h2 className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </h2>
            </span>
          </div>
          <div className="relative">
            {!isThreeDotOpen && <Ellipsis onClick={handleThreeDot} />}
            {isThreeDotOpen && (
              <>
                <X onClick={handleThreeDot} />
                <div className="absolute right-3">
                  <div className="cursor-pointer flex flex-col gap-0.5 ">
                    <Button
                      className={"text-black bg-gray-100 hover:bg-gray-200"}
                      onClick={() => handlePostDelete(post._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      className={"text-black bg-gray-100 hover:bg-gray-200"}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* content */}
        <div className="bg-gray-50">
          <p className="text-lg mb-2 p-4">{post.content || ""}</p>

          {post.media?.length > 0 && (
            <div
              className={`mt-2 grid  ${
                post.media?.length > 2 ? "grid-cols-2" : "grid-cols-1"
              } ${
                post.media?.length > 4 ? "h-[490px] overflow-auto" : ""
              } gap-2`}
            >
              {post.media.map((m, i) => (
                <div key={i}>
                  {m.type === "image" && (
                    <img src={m.url} alt="post" className="w-full max-h-200" />
                  )}
                  {m.type === "video" && (
                    <video src={m.url} controls className="" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* likes/comments count */}
        <div className="flex justify-between items-center p-2">
          <span>{likes.length}</span>
          <span className="flex items-center gap-1 text-sm text-gray-600">
            <MessageCircleIcon size={15} />
            {post.comments?.length ?? 0}
          </span>
        </div>

        {/* actions */}
        <div className="flex justify-around p-2 border-1">
          <span
            className={`flex gap-2  items-center cursor-pointer hover:text-blue-500 transition ${
              likes.includes(currentUser.userId) ? "text-green-400" : ""
            }`}
            onClick={() => handleLike(post._id)}
          >
            <ThumbsUp />
            Like
          </span>
          <span className="flex gap-2 cursor-pointer">
            <MessageCircle onClick={handleFetchComments} />
            Comment
          </span>
          <span className="flex gap-2 cursor-pointer ">
            <Share2 />
            Share
          </span>
        </div>
      </div>

      {/* 🔹 Comment Modal */}
      {showCommentBox && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
          onClick={handleCloseModal} // close when clicking outside
        >
          <div
            className="bg-white rounded-lg shadow-lg w-[600px] max-h-[90vh] overflow-auto p-4"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-semibold">Comments</h2>
              <X
                className="cursor-pointer hover:text-red-500"
                onClick={handleCloseModal}
              />
            </div>
            <Comment
              postId={post._id}
              serverComment={post.comments}
              handleFetchComments={handleFetchComments}
              comments={comments}
              setComments={setComments}
              updatePostCommentCount={updatePostCommentCount}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
