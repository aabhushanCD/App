import { getInitials } from "@/utils/getInitials";
import React from "react";
import { acceptRequest } from "../friend.service";
import { toast } from "sonner";
import { Check, Star, X } from "lucide-react";

const FriendRequestCart = ({ user }) => {
  const handleAcceptRequest = async (friendId) => {
    try {
      const res = await acceptRequest(friendId);
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
  return (
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
        <h3 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h3>
        <p className="text-sm text-gray-500 mb-1">{user.email || "No email"}</p>
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
  );
};

export default FriendRequestCart;
