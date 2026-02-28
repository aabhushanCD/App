import React from "react";

const PostContent = ({ post }) => {
  return (
    <div className="bg-gray-50">
      <p className={`text-lg mb-2 p-4 ${post.content ? "" : "hidden"}`}>
        {post.content || ""}
      </p>

      {post.media?.length > 0 && (
        <div
          className={`mt-2 grid  ${
            post.media?.length > 2 ? "grid-cols-2" : "grid-cols-1"
          } ${post.media?.length > 4 ? "h-[490px] overflow-auto" : ""} gap-2`}
        >
          {post.media.map((m, i) => (
            <div key={i}>
              {m.type === "image" && (
                <img
                  src={m.url}
                  alt="post"
                  className="w-full max-h-200 object-cover filter "
                />
              )}
              {m.type === "video" && (
                <video src={m.url} controls className="object-cover" />
              )}
              {m.type === "audio" && (
                <audio src={m.url} controls className="" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostContent;
