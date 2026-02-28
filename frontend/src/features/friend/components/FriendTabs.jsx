import React from "react";
import { toast } from "sonner";
import { getAllFriends, getAllRequest } from "../friend.service";
import { UserCheck, UserPlus, Users } from "lucide-react";

const FriendTabs = ({
  allUsers,
  setAllUsers,
  setActiveTab,
  activeTab,
  fetchUser,
}) => {
  const handleAllFriends = async () => {
    if (allUsers.title === "All Friends") return;
    try {
      const res = await getAllFriends();
      if (res.status === 200) {
        setAllUsers({ title: "All Friends", data: res.data.friend });
        setActiveTab("all");
      }
    } catch (error) {
      console.error(
        error?.response?.data?.message || "Problem in getting All friend",
      );
      toast.error(
        error?.response?.data?.message || "Problem in getting All friend",
      );
    }
  };

  const handleFriendRequest = async () => {
    if (allUsers.title === "Friend Request") return;
    try {
      const res = await getAllRequest();
      if (res.status === 200) {
        setAllUsers({
          title: "Friend Request",
          data: res.data.receivedRequest,
        });
        setActiveTab("requests");
      }
    } catch (error) {
      console.error(
        error?.response?.data?.message || "problem in getting friend request",
      );
      toast.error(
        error?.response?.data?.message || "problem in getting friend request",
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-8 inline-flex space-x-2">
      <button
        onClick={handleAllFriends}
        className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
          activeTab === "all"
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Users className="w-5 h-5" />
        <span>All Friends</span>
        {activeTab === "all" && (
          <span className="bg-white text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
            {allUsers.data.length}
          </span>
        )}
      </button>

      <button
        onClick={handleFriendRequest}
        className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
          activeTab === "requests"
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <UserCheck className="w-5 h-5" />
        <span>Requests</span>
        {activeTab === "requests" && allUsers.data.length > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {allUsers.data.length}
          </span>
        )}
      </button>

      <button
        onClick={fetchUser}
        className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
          activeTab === "add"
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <UserPlus className="w-5 h-5" />
        <span>Add Friends</span>
      </button>
    </div>
  );
};

export default FriendTabs;
