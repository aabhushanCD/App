import React from "react";
import { toast } from "sonner";
import { sendRequest } from "../friend.service";
import { MoreVertical, UserPlus, UserX } from "lucide-react";
import { getInitials } from "@/utils/getInitials";

const AddFriendCart = ({ user }) => {
  const handleSendRequest = async (user) => {
    try {
      const res = await sendRequest(user._id);
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
  return (
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
        <h3 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h3>
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
  );
};

export default AddFriendCart;
