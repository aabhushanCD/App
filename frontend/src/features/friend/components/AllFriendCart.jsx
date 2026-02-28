import { getInitials } from "@/utils/getInitials";
import { Heart, MessageCircle } from "lucide-react";
import React from "react";

const AllFriendCart = ({ user }) => {
  return (
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
        <h3 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h3>
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
  );
};

export default AllFriendCart;
