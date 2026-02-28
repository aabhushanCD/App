import { notification } from "@/features/notification/notification.service";
import { Bell } from "lucide-react";
import React, { memo, useState } from "react";
import Notification from "../Notification";

const NavNotification = () => {
  const [isNotification, setNotification] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const handleBellClick = () => {
    setNotification(false);
    fetchNotification();
    setBellOpen(true);
  };
  const fetchNotification = async () => {
    try {
      const res = await notification();
      if (res.status === 200) {
        setNotificationData(res.data.notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
    }
  };
  const handleNotificationClose = () => {
    setBellOpen(false);
  };
  return (
    <div className="relative">
      <Bell
        className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500"
        onClick={handleBellClick}
      />
      {isNotification && (
        <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
      )}

      {/* Notification Popup */}
      {bellOpen && (
        <Notification
          setNotificationData={setNotificationData}
          notificationData={notificationData}
          handleNotificationClose={handleNotificationClose}
        />
      )}
    </div>
  );
};

export default memo(NavNotification);
