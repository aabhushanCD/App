import { Bookmark, Grid2x2, Tags } from "lucide-react";
import React from "react";

const ProfileTabs = () => {
  return (
    <div className="flex  bg-gray-400 justify-around p-3 ">
      <Grid2x2 />
      <Bookmark />
      <Tags />
    </div>
  );
};

export default ProfileTabs;
