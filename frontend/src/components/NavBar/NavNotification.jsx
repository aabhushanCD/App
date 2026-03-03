import React, { memo, useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { notification } from "@/features/notification/notification.service";
import Notification from "../../features/notification/Notification";

const NavNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [isBellOpen, setIsBellOpen] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(true);

  const bellRef = useRef();

  // Fetch notifications once on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await notification();
        if (res.status === 200) {
          setNotifications(res.data.notifications);
          // If there are unread notifications, show badge
          setHasNewNotification(res.data.notifications.length > 0);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error.message);
      }
    };
    fetchNotifications();
  }, []);

  // Close notification popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setIsBellOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle notification popup
  const handleBellClick = () => {
    setIsBellOpen((prev) => !prev);
    // Once user opens, consider notifications "seen"
    setHasNewNotification(false);
  };

  return (
    <div className="relative" ref={bellRef}>
      {/* Bell Icon */}
      <Bell
        className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500 transition-colors"
        onClick={handleBellClick}
      />

      {/* Notification Badge */}
      {hasNewNotification && (
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
      )}

      {/* Notification Popup */}
      {isBellOpen && (
        <Notification
          notificationData={notifications}
          setNotificationData={setNotifications}
          handleNotificationClose={() => setIsBellOpen(false)}
        />
      )}
    </div>
  );
};

export default memo(NavNotification);
