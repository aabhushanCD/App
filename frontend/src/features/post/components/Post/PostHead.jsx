import { Button } from "@/components/ui/button";
import { timeAgo } from "@/utils/constants";
import { Ellipsis, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostHead = ({ currentUser, post, handlePostDelete }) => {
  const navigate = useNavigate();
  const [isThreeDotOpen, setThreeDot] = useState(false);
  const handleThreeDot = () => {
    setThreeDot((isThreeDotOpen) => !isThreeDotOpen);
  };
  return (
    <div className="flex justify-between items-center border-b p-4">
      <div
        className="flex gap-2 items-center"
        onClick={() => {
          const isCurrentUser = currentUser.userId !== post.creatorId._id;
          navigate(
            isCurrentUser ? `/user/profile/${post.creatorId._id}` : "/profile/",
          );
        }}
      >
        {post.creatorId?.imageUrl ? (
          <img
            src={post.creatorId.imageUrl}
            alt={`${post.creatorId.name}'s profile`}
            className="w-15 h-15 rounded-full overflow-hidden object-cover "
          />
        ) : (
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-400 text-white font-bold text-lg">
            {post.creatorId?.name?.charAt(0) || currentUser.name.charAt(0)}
          </div>
        )}
        <span>
          <h1 className="font-semibold">
            {post.creatorId.name ||
              (post.creatorId._id === currentUser._id && currentUser.name)}
          </h1>
          <h2 className="text-sm text-gray-500">{timeAgo(post.createdAt)}</h2>
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
                <Button className={"text-black bg-gray-100 hover:bg-gray-200"}>
                  Edit
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostHead;
