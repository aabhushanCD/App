import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getUserProfile } from "./profile.service";
import ProfileTabs from "./components/ProfileTabs";
import ProfilePostsGrid from "./components/ProfilePostsGrid";

const OtherProfile = () => {
  const { Id } = useParams();

  const [profile, setProfile] = useState({
    user: {},
    posts: [],
    highlights: [],
  });

  const fetchUserProfile = async () => {
    try {
      const res = await getUserProfile(Id);
      if (res.data.success) {
        setProfile(res.data);
      }
    } catch (error) {
      console.error(error.message || "Failed to fetch profile");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [Id]);

  const { user, posts, highlights } = profile;

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-3xl">
        {/* ---------- Profile Header ---------- */}

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 py-6 border-b">
          {/* Profile Image */}
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="profile"
              className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-gray-200 shadow-sm"
            />
          ) : (
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-semibold">
              U
            </div>
          )}

          {/* Profile Info */}
          <div className="flex flex-col gap-3 text-center md:text-left">
            <span className="text-xl font-semibold text-gray-900">
              {user?.name || "User"}
            </span>

            {/* Stats */}
            <div className="flex justify-center md:justify-start gap-6 text-sm text-gray-700">
              <span>
                <span className="font-semibold text-gray-900">
                  {posts?.length || 0}
                </span>{" "}
                posts
              </span>

              <span>
                <span className="font-semibold text-gray-900">
                  {user?.totalFriends || 0}
                </span>{" "}
                friends
              </span>
            </div>

            {/* Bio */}
            <div className="text-sm text-gray-700 flex flex-col gap-1">
              {user?.bio && <p>{user.bio}</p>}

              {user?.website && (
                <a
                  href={user.website}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                >
                  {user.website}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ---------- Highlights ---------- */}

        {highlights?.length > 0 && (
          <div className="flex gap-5 py-5 overflow-x-auto scrollbar-thin">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col items-center gap-1"
              >
                {h.mediaUrl ? (
                  <img
                    src={h.mediaUrl}
                    alt="highlight"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    ?
                  </div>
                )}

                <span className="text-xs text-gray-600 max-w-[80px] text-center truncate">
                  {h.memo}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* ---------- Tabs ---------- */}

        <ProfileTabs />

        {/* ---------- Posts Grid ---------- */}

        <ProfilePostsGrid posts={posts}></ProfilePostsGrid>
      </div>
    </div>
  );
};

export default OtherProfile;
