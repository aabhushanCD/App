import React from "react";
import profile from "../assets/profile.png";
import { Ellipsis, MessageCircle, Share2, ThumbsUp, Video } from "lucide-react";

const PostContainer = ({ serverRecived }) => {
  return (
    <div className=" w-[520px] mt-4">
      <div className="flex flex-col max-h-[720px] justify-between border-1 ">
        <div className=" flex  border-b-1 justify-between p-4 ">
          <div className="flex gap-2">
            <img src={profile} alt="profile" width={50} />
            <span>
              <h1>{"Aabhushan"}</h1>
              <h2>{"now"}</h2>
            </span>
          </div>
          <Ellipsis />
        </div>
        <div className="p-4 bg-gray-100">
          <div>
            {serverRecived.length > 0 && (
              <div>
                {serverRecived.map((post, index) => (
                  <div key={index}>
                    <span className="text-3xl">{post.content}</span>
                    <div className="mt-2">
                      {post.files.map((file, fileIndex) => (
                        <div key={fileIndex}>
                          {file.imageUrl && (
                            <img
                              src={file.imageUrl}
                              alt=""
                              className="rounded-lg w-full max-h-60 object-cover mb-2"
                            />
                          )}
                          {/* {file.videoUrl && (
                              <video src={file.videoUrl} controls></video>
                            )} */}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-around p-2 border-1">
          <span className="flex gap-2">
            <ThumbsUp />
            Like
          </span>
          <span className="flex gap-2">
            <MessageCircle />
            Comment
          </span>
          <span className="flex gap-2">
            <Share2 />
            Share
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
