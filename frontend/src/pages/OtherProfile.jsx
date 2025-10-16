import { ServerApi } from "@/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid2x2, Bookmark, Tags } from "lucide-react";

const OtherProfile = () => {
  const { Id } = useParams();
  const [profile, setProfile] = useState({
    user: {},
    posts: [],
    highlights: [],
  });

  // 🧠 Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`${ServerApi}/profile/getUserProfile/${Id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setProfile(res.data);
      }
    } catch (error) {
      console.error(error.message || "Failed to fetch user profile");
    }
  };
  console.log(profile);
  useEffect(() => {
    fetchUserProfile();
  }, [Id]);

  const { user, posts, highlights } = profile;

  return (
    <div className="md:flex md:items-center md:justify-center">
      <div className="p-2 md:w-[50%]">
        {/* --- Profile Info Section --- */}
        <div className="flex rounded-full gap-4 md:gap-20 items-center">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="profile"
              className="w-25 h-25 md:h-50 md:w-50 rounded-full object-cover"
            />
          ) : (
            <span className="w-40 h-40 border-2 rounded-full bg-gray-300" />
          )}

          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <span>
                <span className="font-bold">{posts?.length || 0}</span> Posts
              </span>
              <span>
                <span className="font-bold">{user?.totalFriends || 0}</span>{" "}
                Friends
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-lg">
                {user?.name || "User"}
              </span>
              <span>{user?.bio || "No bio yet."}</span>
              <span className="text-blue-500 cursor-pointer">webLink</span>
            </div>
          </div>
        </div>

        {/* --- Highlights Section --- */}
        {highlights?.length > 0 && (
          <div className="flex gap-4 p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-24 flex flex-col items-center"
              >
                {h.mediaUrl ? (
                  <img
                    src={h.mediaUrl}
                    alt="highlight"
                    className="w-24 h-24 rounded-full border-4 object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center rounded-full border text-gray-500 bg-gray-200">
                    No Media
                  </div>
                )}
                {h.memo && (
                  <span className="text-sm text-center mt-1">{h.memo}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* --- Tabs Section --- */}
        <div className="flex bg-gray-300 justify-around p-3">
          <Grid2x2 />
          <Bookmark />
          <Tags />
        </div>

        {/* --- Posts Section --- */}
        {posts?.length > 0 ? (
          <div className="grid md:grid-cols-3 grid-cols-2 gap-2 p-2">
            {posts.map((post) => (
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
        ) : (
          <div className="text-center py-6 text-gray-500">
            No posts available
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherProfile;
