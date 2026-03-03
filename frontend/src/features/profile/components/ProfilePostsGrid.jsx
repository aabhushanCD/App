import React from "react";

const ProfilePostsGrid = ({ posts }) => {
  return (
    <>
      {posts?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 py-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="relative aspect-square bg-gray-100 overflow-hidden rounded-md cursor-pointer group"
            >
              {post?.media?.length > 0 ? (
                <>
                  {post.media[0].type === "image" ? (
                    <img
                      src={post.media[0].url}
                      alt="post"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <video
                      src={post.media[0].url}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {post.media.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      +{post.media.length - 1}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No Media
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 text-sm">
          No posts available
        </div>
      )}
    </>
  );
};

export default ProfilePostsGrid;
