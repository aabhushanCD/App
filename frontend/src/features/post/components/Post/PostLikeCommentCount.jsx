import { Heart, MessageCircleIcon } from "lucide-react";
import React from "react";

const PostLikeCommentCount = ({ likes, currentUser, post }) => {
  return (
    <div className="flex justify-between items-center p-2">
      <span
        className={`flex gap-2 items-center cursor-pointer ${
          likes.includes(currentUser.userId) ? "text-red-500" : ""
        }`}
      >
        <Heart />
        {likes.length}
      </span>
      <span className="flex items-center gap-1 text-sm text-gray-600">
        <MessageCircleIcon size={15} />
        {post.comments?.length ?? 0}
      </span>
    </div>
  );
};

export default PostLikeCommentCount;
