import React, { useEffect, useState } from "react";

import { getAllUsers } from "@/features/friend/friend.service";
import FriendHead from "./components/FriendHead";
import FriendTabs from "./components/FriendTabs";

import AddFriendSection from "./AddFriendSection";

import AllFriendSection from "./AllFriendSection";

import FriendRequestSection from "./FriendRequestSection";
import NoDataFriends from "./components/NoDataFriends";

const FriendContainer = () => {
  const [allUsers, setAllUsers] = useState({
    title: "",
    data: [],
  });
  const [activeTab, setActiveTab] = useState("all");

  const fetchUser = async () => {
    if (allUsers.title === "Add Friends") return;
    try {
      const res = await getAllUsers();
      if (res.status === 200) {
        setAllUsers({ title: "Add Friends", data: res.data.users });
        setActiveTab("add");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  
  return (
    <div className=" min-h-screen text-sm  md:text-lg flex-wrap min-w-full sm:justify-self-center bg-gradient-to-r from-blue-50 via-white to-purple-50 p-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FriendHead />

        {/* Tabs */}
        <FriendTabs
          allUsers={allUsers}
          setAllUsers={setAllUsers}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          fetchUser={fetchUser}
        />

        {/* Add Friends Section */}
        {allUsers.title === "Add Friends" && (
          <AddFriendSection allUsers={allUsers} />
        )}

        {/* All Friends Section */}
        {allUsers.title === "All Friends" && (
          <AllFriendSection allUsers={allUsers} />
        )}

        {/* Friend Requests Section */}
        {allUsers.title === "Friend Request" && (
          <FriendRequestSection allUsers={allUsers} />
        )}

        {/* Empty State */}
        {allUsers.data.length === 0 && (
          <NoDataFriends activeTab={activeTab} fetchUser={fetchUser} />
        )}
      </div>
    </div>
  );
};

export default FriendContainer;
