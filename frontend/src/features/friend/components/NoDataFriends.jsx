import { UserCheck, UserPlus, Users } from "lucide-react";
import React from "react";

const NoDataFriends = ({ activeTab, fetchUser }) => {
  return (
    <div className="text-center py-20">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
        {activeTab === "all" && <Users className="w-12 h-12 text-gray-400" />}
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
  );
};

export default NoDataFriends;
