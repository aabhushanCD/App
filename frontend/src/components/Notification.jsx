import { timeAgo } from "@/utils/constants";
import { useNotify } from "@/store/NotificationStore";

import { MessageSquare, X } from "lucide-react";
import React, { useEffect } from "react";

const Notification = ({
  notificationData,
  handleNotificationClose,
  setNewMessageNotification,
  setNotificationData,
}) => {
  const socket = useNotify();
  useEffect(() => {
    if (!socket) return;

    socket.on("notification", (data) => {
      if (data) {
        setNotificationData(true);
        setNotificationData((prev) => [data, ...prev]);
        console.log("🔔 NEW NOTIFICATION ! ", data);
      }
    });
    socket.on("newMessageNotify", (data) => {
      if (data) {
        setNewMessageNotification((prev) => ({
          open: !prev.open,
          newMessage: data,
        }));
      }
    });
    return () => socket.off("notification");
  }, [socket]);

  return (
    <div className="absolute -right-8 mt-2 border w-80 rounded-2xl bg-blue-400 shadow-lg">
      <div className="p-3">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Notifications</h1>
          <X onClick={handleNotificationClose} />
        </div>

        <div className="flex items-baseline gap-4 mt-3">
          <button className="bg-blue-50 text-blue-500 rounded-2xl p-2 font-semibold">
            All
          </button>
          <button className="font-semibold">Unread</button>
        </div>

        <div className="mt-3 space-y-3 max-h-100 overflow-y-auto ">
          {notificationData.length > 0 ? (
            notificationData.map((item, index) => (
              <div key={index} className="flex gap-3 items-start border-b pb-2">
                <div className="relative">
                  <div className=" w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center flex-shrink-0">
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
                      <div className="absolute right-0 -bottom-3 text-2xl">
                        ❤️
                      </div>
                    )}
                    {item?.type == "comment" && (
                      <div className="absolute right-0 -bottom-3 text-2xl ">
                        <MessageSquare className="text-green-500 " />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-[20px]">
                    {item.senderId?.name || "Someone"}
                  </span>{" "}
                  {item.message || "sent you a notification"}
                  <p className="text-xs text-gray-700">
                    {timeAgo(item.createdAt)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No notifications yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
