import { Heart, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { notification } from "./notification.service";
import { timeAgo } from "@/utils/constants";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotification = async () => {
      try {
        const res = await notification();
        setNotifications(res.data.notifications);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    getNotification();
  }, []);

  return (
    <div className="min-h-screen   bg-linear-to-r  flex justify-center p-4">
      <div className="w-full max-w-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Notifications
          </h1>
          <p className="text-sm text-gray-500">
            Stay updated with activity on your account
          </p>
        </div>

        {/* Empty state */}
        {notifications.length === 0 && (
          <div className="bg-white border rounded-xl p-6 text-center text-gray-500">
            No notifications yet
          </div>
        )}

        {/* Notification List */}
        <div className="bg-white shadow-sm border  rounded-xl divide-y">
          {notifications?.map((n) => (
            <div
              key={n._id}
              className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition ${
                !n.isRead ? "bg-blue-50" : ""
              }`}
            >
              {/* Avatar */}
              <div className="relative">
                <img
                  src={n.senderId?.imageUrl || "/avatar.png"}
                  alt={n.senderId?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />

                {/* Action icon */}
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow">
                  {n.type === "liked" ? (
                    <Heart className="text-red-500 w-3 h-3" />
                  ) : (
                    <MessageCircle className="text-blue-500 w-3 h-3" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  <span className="font-medium">{n.senderId?.name}</span>{" "}
                  {n.type === "liked"
                    ? "liked your post"
                    : "commented on your post"}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {timeAgo(n.createdAt)}
                </p>
              </div>

              {/* Unread indicator */}
              {!n.isRead && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
