import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ServerApi } from "@/constants";
import axios from "axios";
import { toast } from "sonner";
import {
  UserPlus,
  UserCheck,
  Users,
  X,
  Check,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Star,
  MoreVertical,
  Heart,
  UserX,
} from "lucide-react";

const FriendContainer = () => {
  const [allUsers, setAllUsers] = useState({
    title: "",
    data: [],
  });
  const [activeTab, setActiveTab] = useState("all");

  const fetchUser = async () => {
    if (allUsers.title === "Add Friends") return;
    try {
      const res = await axios.get(`${ServerApi}/friend/getAllUsers`, {
        withCredentials: true,
      });
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

  // Send Friend request
  const handleSendRequest = async (user) => {
    try {
      const res = await axios.post(
        `${ServerApi}/friend/sendRequest/${user._id}`,
        {},
        { withCredentials: true },
      );
      if (res.status === 200) {
        toast.success("Friend Request Sent Successfully");
      }
    } catch (error) {
      console.error(
        error?.response?.data?.message || "Problem in Sending friend Request",
      );
      toast.error(
        error?.response?.data?.message || "Problem in Sending friend Request",
      );
    }
  };

  // Friend request Accept
  const handleAcceptRequest = async (friendId) => {
    try {
      const res = await axios.post(
        `${ServerApi}/friend/acceptRequest/${friendId}`,
        {},
        { withCredentials: true },
      );
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(
        error?.response?.data?.message || "Problem in accept friend request",
      );
      toast.error(
        error?.response?.data?.message || "Problem in accept friend request",
      );
    }
  };

  // get all Friend Request
  const handleFriendRequest = async () => {
    if (allUsers.title === "Friend Request") return;
    try {
      const res = await axios.get(`${ServerApi}/friend/getAllRequest`, {
        withCredentials: true,
      });
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

  // get all Friends
  const handleAllFriends = async () => {
    if (allUsers.title === "All Friends") return;
    try {
      const res = await axios.get(`${ServerApi}/friend/getAllFriends`, {
        withCredentials: true,
      });
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

  // Get user initials for avatar
  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Friends</h1>
          <p className="text-gray-600">
            Manage your connections and friend requests
          </p>
        </div>

        {/* Tabs */}
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

        {/* Add Friends Section */}
        {allUsers.title === "Add Friends" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allUsers?.data?.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {/* User Image/Avatar */}
                <div className="relative">
                  {user.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt={user.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <span className="text-5xl font-bold text-white">
                        {getInitials(user.name)}
                      </span>
                    </div>
                  )}
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* User Info */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {user.email || "No email provided"}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSendRequest(user)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Add Friend</span>
                    </button>
                    <button className="p-2.5 border-2 border-gray-300 hover:border-red-300 hover:bg-red-50 rounded-lg transition-colors">
                      <UserX className="w-5 h-5 text-gray-600 hover:text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* All Friends Section */}
        {allUsers.title === "All Friends" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allUsers?.data?.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                {/* User Image/Avatar */}
                <div className="relative">
                  {user.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt={user.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                      <span className="text-5xl font-bold text-white">
                        {getInitials(user.name)}
                      </span>
                    </div>
                  )}

                  {/* Online Status Indicator */}
                  <div className="absolute bottom-3 right-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold shadow-lg transform scale-90 group-hover:scale-100 transition-transform flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>

                {/* User Info */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {user.email || "Friend since 2024"}
                  </p>

                  {/* Quick Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>Message</span>
                    </button>
                    <button className="p-2.5 border-2 border-gray-300 hover:border-blue-300 hover:bg-blue-50 rounded-lg transition-colors">
                      <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Friend Requests Section */}
        {allUsers.title === "Friend Request" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allUsers?.data?.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-2xl shadow-md border-2 border-orange-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {/* User Image/Avatar */}
                <div className="relative">
                  {user.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt={user.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                      <span className="text-5xl font-bold text-white">
                        {getInitials(user.name)}
                      </span>
                    </div>
                  )}

                  {/* New Request Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>NEW</span>
                    </span>
                  </div>
                </div>

                {/* User Info */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">
                    {user.email || "No email"}
                  </p>
                  <p className="text-xs text-orange-600 font-semibold mb-4">
                    Sent you a friend request
                  </p>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAcceptRequest(user._id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Accept</span>
                    </button>
                    <button className="flex-1 bg-gray-200 hover:bg-red-100 text-gray-700 hover:text-red-700 font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                      <X className="w-4 h-4" />
                      <span>Decline</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {allUsers.data.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
              {activeTab === "all" && (
                <Users className="w-12 h-12 text-gray-400" />
              )}
              {activeTab === "requests" && (
                <UserCheck className="w-12 h-12 text-gray-400" />
              )}
              {activeTab === "add" && (
                <UserPlus className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {activeTab === "all" && "No Friends Yet"}
              {activeTab === "requests" && "No Pending Requests"}
              {activeTab === "add" && "No Users to Add"}
            </h3>
            <p className="text-gray-500 mb-6">
              {activeTab === "all" &&
                "Start connecting with people by sending friend requests"}
              {activeTab === "requests" &&
                "You don't have any pending friend requests"}
              {activeTab === "add" &&
                "Check back later for new users to connect with"}
            </p>
            {activeTab === "all" && (
              <button
                onClick={fetchUser}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center space-x-2"
              >
                <UserPlus className="w-5 h-5" />
                <span>Find Friends</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendContainer;
