import { useNotify } from "@/features/notification/NotificationStore";

import { X } from "lucide-react";
import React, { useEffect } from "react";
import NotificationData from "./components/NotificationData";

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
              <NotificationData item={item} index={index} />
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
