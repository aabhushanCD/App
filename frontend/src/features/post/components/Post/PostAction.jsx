import React from "react";
import { toast } from "sonner";
import { like_dislikePost } from "../../postService";
import { Heart, MessageCircle, Share2 } from "lucide-react";

const PostAction = ({
  likes,
  currentUser,
  setLikes,
  post,
  handleFetchComments,
}) => {
  const handleShare = async (postId) => {
    const shareUrl = `${window.location.origin}/post/${postId}`;
    const shareData = {
      title: "Check out this post!",
      text: "I found something interesting on Smart Learn 👀",
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success("Post shared successfully!");
      } else {
        // Fallback for unsupported browsers
        await navigator.clipboard.writeText(shareUrl);
        toast.info("Browser doesn’t support sharing. Link copied instead!");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error sharing:", error);
        toast.error("Failed to share post.");
      }
    }
  };

  const handleLike = async (postId) => {
    const userId = currentUser.userId;
    const alreadyLiked = likes.includes(userId);

    // 1️⃣ Optimistically update UI
    setLikes((prevLikes) =>
      alreadyLiked
        ? prevLikes.filter((id) => id !== userId)
        : [...prevLikes, userId],
    );
    try {
      await like_dislikePost(postId);
    } catch (error) {
      setLikes((prevLikes) =>
        alreadyLiked
          ? [...prevLikes, userId]
          : prevLikes.filter((id) => id !== userId),
      );
      console.error(error.message);
      toast.error("Failed to update like");
    }
  };

  return (
    <div className="flex justify-around p-2 border-1">
      <span
        className={`flex gap-2  items-center cursor-pointer hover:text-blue-500 transition ${
          likes.includes(currentUser.userId) ? "text-green-400" : ""
        }`}
        onClick={() => handleLike(post._id)}
      >
        <Heart
          className={`w-5 h-5 ${
            likes.includes(currentUser.userId)
              ? "text-red-500"
              : "text-gray-500"
          }`}
        />
        Like
      </span>
      <span className="flex gap-2 cursor-pointer" onClick={handleFetchComments}>
        <MessageCircle />
        Comment
      </span>
      <span className="flex gap-2 cursor-pointer ">
        <Share2 onClick={() => handleShare(post._id)} />
        Share
      </span>
    </div>
  );
};

export default PostAction;
