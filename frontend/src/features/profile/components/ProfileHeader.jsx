import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import React from "react";

const ProfileHeader = ({ setIsEdit, currentUser, postlength }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-6">

      {/* Profile Image */}
      <div className="flex-shrink-0">
        {currentUser.imageUrl ? (
          <img
            src={currentUser.imageUrl}
            alt="profile"
            className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-200 shadow-sm"
          />
        ) : (
          <div className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-semibold">
            U
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="flex flex-col gap-4 w-full max-w-xl">

        {/* Top Section */}
        <div className="flex flex-wrap items-center gap-3">

          <span className="text-xl font-semibold text-gray-900">
            {currentUser.name || "User"}
          </span>

          <Button
            variant="secondary"
            className="rounded-lg"
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </Button>

          <Button variant="outline" className="rounded-lg">
            View Archive
          </Button>

          <button className="p-2 rounded-md hover:bg-gray-100 transition">
            <Settings size={20} />
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-6 text-sm text-gray-700">
          <span>
            <span className="font-semibold text-gray-900">
              {postlength || 0}
            </span>{" "}
            posts
          </span>

          <span>
            <span className="font-semibold text-gray-900">
              {currentUser.friendsCount || 0}
            </span>{" "}
            friends
          </span>
        </div>

        {/* Bio Section */}
        <div className="flex flex-col text-sm text-gray-700 gap-1">

          {currentUser.bio && (
            <p className="leading-relaxed">
              {currentUser.bio}
            </p>
          )}

          {currentUser.website && (
            <a
              href={currentUser.website}
              target="_blank"
              className="text-blue-600 hover:underline font-medium"
            >
              {currentUser.website}
            </a>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProfileHeader;