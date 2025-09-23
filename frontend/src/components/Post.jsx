import React, { useState } from "react";
import {
  Ellipsis,
  MessageCircle,
  MessageCircleIcon,
  Share2,
  ThumbsUp,
  X,
} from "lucide-react";
import axios from "axios";

import porfile from "../assets/profile.png";
import { useAuth } from "@/store/AuthStore";
import { Button } from "./ui/button";
import { toast } from "sonner";
const Post = ({ post, handlePostDelete }) => {
  const { currentUser } = useAuth();
  const [likes, setLikes] = useState(post.likes);
  const [isThreeDotOpen, setThreeDot] = useState(false);

  const handleLike = async (postId) => {
    try {
      const res = await axios.put(
        `${ServerApi}/post/like_dislikePost/${postId}`,
        {},
        { withCredentials: true }
      );

      setLikes(res.data.likes);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleThreeDot = () => {
    setThreeDot((isThreeDotOpen) => !isThreeDotOpen);
  };

  return (
    <div className=" flex flex-col border rounded-lg bg-white shadow-sm">
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
      <div className=" bg-gray-50">
        <p className="text-lg mb-2 p-4">{post.content || ""}</p>

        {post.media?.length > 0 && (
          <div
            className={`mt-2 grid  ${
              post.media?.length > 2 ? "grid-cols-2" : " grid-cols-1"
            } ${post.media?.length > 4 ? "h-[490px] overflow-auto" : ""} gap-2`}
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

      <div className=" flex justify-between items-center p-2">
        <span>{likes.length}</span>
        <span>
          <MessageCircleIcon size={15} />
        </span>
      </div>
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
        <span className="flex gap-2 cursor-pointer  ">
          <MessageCircle />
          Comment
        </span>
        <span className="flex gap-2 cursor-pointer ">
          <Share2 />
          Share
        </span>
      </div>
    </div>
  );
};

export default Post;
