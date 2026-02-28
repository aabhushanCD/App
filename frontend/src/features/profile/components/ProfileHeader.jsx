import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import React from "react";

const ProfileHeader = ({ setIsEdit, currentUser, postlength }) => {
  return (
    <div className="flex rounded-full gap-4 md:gap-20 items-center">
      {currentUser.imageUrl ? (
        <img
          className="w-25 h-25 md:h-50 md:w-50 rounded-full object-cover"
          src={currentUser.imageUrl}
          alt="profile"
        />
      ) : (
        <span className="w-40 h-40 border-2 rounded-full bg-gray-300" />
      )}

      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <Button onClick={() => setIsEdit(true)}>Edit profile</Button>
          <Button>View archive</Button>
          <Settings />
        </div>
        <div className="flex gap-4 items-center">
          <span>
            <span className="font-bold">{postlength || 0}</span> posts
          </span>
          <span>
            <span className="font-bold">{postlength || 0}</span> Friends
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-lg">
            {currentUser.name || "User"}
          </span>
          <span>{currentUser.bio || "No bio yet."}</span>
          <span className="text-blue-500 cursor-pointer">webLink</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
