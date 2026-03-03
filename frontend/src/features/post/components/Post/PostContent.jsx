import React from "react";

const PostContent = ({ post }) => {
  const mediaCount = post.media?.length || 0;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden">
      {/* Post Text */}
      {post.content && (
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed px-4 pt-3 pb-2">
          {post.content}
        </p>
      )}

      {/* Media Section */}
      {mediaCount > 0 && (
        <div
          className={`grid gap-1 px-2 pb-2 ${
            mediaCount === 1
              ? "grid-cols-1"
              : mediaCount === 2
                ? "grid-cols-2"
                : "grid-cols-2"
          }`}
        >
          {post.media.map((m, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg bg-black"
            >
              {m.type === "image" && (
                <img
                  src={m.url}
                  alt="post"
                  className="w-full h-full object-cover max-h-[420px] hover:scale-105 transition duration-300"
                />
              )}

              {m.type === "video" && (
                <video
                  src={m.url}
                  controls
                  className="w-full max-h-[420px] object-cover rounded-lg"
                />
              )}

              {m.type === "audio" && (
                <div className="p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg">
                  <audio src={m.url} controls className="w-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostContent;
