import { useAuth } from "@/features/auth/authContext";

import React, { useEffect, useState } from "react";

import EditProfile from "./components/EditProfile";
import ProfileHeader from "./components/ProfileHeader";
import ProfileHighlights from "./components/ProfileHighlights";
import ProfilePostsGrid from "./components/ProfilePostsGrid";
import ProfileTabs from "./components/ProfileTabs";
import { myPosts } from "../post/postService";

const Profile = () => {
  const [myPost, setMyPost] = useState([]);
  const { currentUser, setCurrentUser } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await myPosts();
        setMyPost(res.data.posts);
      } catch (error) {
        console.error(
          error?.response?.data?.message ||
            "Something went wrong while fetching posts",
        );
      }
    };
    fetchMyPosts();
  }, []);

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-3xl">
        {/* --- Profile Info Section --- */}
        <ProfileHeader
          setIsEdit={setIsEdit}
          currentUser={currentUser}
          postlength={myPost?.length}
        />
        {/* ---Edit Profile--- */}
        <EditProfile
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />

        {/* --- Story / Highlights --- */}
        <ProfileHighlights myPost={myPost} />

        {/* --- Tabs Section --- */}
        <ProfileTabs />

        {/* --- My Posts --- */}
        <ProfilePostsGrid posts={myPost} />
      </div>
    </div>
  );
};

export default Profile;
