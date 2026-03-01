import { timeAgo } from "@/utils/constants";
import { MessageSquare } from "lucide-react";
import React from "react";

const NotificationData = ({ item, index }) => {
  return (
    <div key={index} className="flex gap-3 items-start border-b pb-2">
      <div className="relative">
        <div className=" w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center flex-shrink-0">
          {item.senderId?.imageUrl ? (
            <img
              src={item.senderId.imageUrl}
              alt={item.senderId.name || "User"}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-700 font-semibold text-lg">
              {item.senderId?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          )}
          {item?.type == "liked" && (
            <div className="absolute right-0 -bottom-3 text-2xl ">❤️</div>
          )}
          {item?.type == "comment" && (
            <div className="absolute right-0 -bottom-3 text-2xl ">
              <MessageSquare className="text-green-500 " size={15} />
            </div>
          )}
        </div>
      </div>
      <div>
        <span className="font-semibold text-[20px]">
          {item.senderId?.name || "Someone"}
        </span>{" "}
        <span className="text-gray-500">
          {item.message || "sent you a notification"}
          <p className="text-xs text-gray-700">{timeAgo(item.createdAt)}</p>
        </span>
      </div>
    </div>
  );
};

export default NotificationData;
