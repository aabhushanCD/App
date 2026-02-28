import React from "react";

const ProfilePostsGrid = ({ myPost }) => {
  return (
    <>
      {myPost?.length > 0 && (
        <div className="grid md:grid-cols-3 grid-cols-2 gap-2 p-2">
          {myPost.map((post) => (
            <div
              key={post._id}
              className="relative aspect-square bg-gray-200 overflow-hidden rounded-md cursor-pointer group"
            >
              {post?.media?.length > 0 ? (
                <>
                  {post.media[0].type === "image" ? (
                    <img
                      src={post.media[0].url}
                      alt="post"
                      className="w-full h-full object-cover group-hover:opacity-90 transition"
                    />
                  ) : (
                    <video
                      src={post.media[0].url}
                      className="w-full h-full object-cover group-hover:opacity-90 transition"
                      controls
                    />
                  )}

                  {/* Show overlay if multiple media */}
                  {post.media.length > 1 && (
                    <div className="absolute top-[50%] right-[50%] bg-black/60 text-white text-lg px-2 py-1 rounded-md">
                      +{post.media.length - 1}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No Media
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProfilePostsGrid;
