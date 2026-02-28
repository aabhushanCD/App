import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Bell, House, MessageCircle, Search, LogOut } from "lucide-react";
// import { useAuth } from "@/store/AuthStore";
import { toast } from "sonner";
import { ServerApi } from "@/utils/constants";
import axios from "axios";

import MessangerContainer from "@/containers/MessangerContainer";

// import SearchBox from "./SearchBox";

import Notification from "./Notification";

import { useAuth } from "@/features/auth/authContext";
import ChatBox from "@/containers/ChatBox";
import NavSearch from "./NavBar/NavSearch";
import NavMessenger from "./NavBar/NavMessanger";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isNotification, setNotification] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [notificationData, setNotificationData] = useState([]);

  // Audio/video calling setup

  const fetchNotification = async () => {
    try {
      const res = await axios.get(`${ServerApi}/notification`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setNotificationData(res.data.notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
    }
  };

  const handleBellClick = () => {
    setNotification(false);
    fetchNotification();
    setBellOpen(true);
  };
  const handleNotificationClose = () => {
    setBellOpen(false);
  };

  return (
    <div className="flex justify-between flex-1  items-center px-6 py-3 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <a
          href="/home"
          className="bg-transparent text-blue-500 mr-2 text-2xl font-bold hover:bg-transparent"
        >
          Hell'O
        </a>
      </div>

      {/* Center Navigation */}
      <div className="hidden md:flex gap-6">
        <Button
          className="bg-transparent text-gray-700 hover:text-blue-500 hover:bg-gray-100"
          onClick={() => navigate("/home")}
        >
          Home
        </Button>
        <Button className="bg-transparent text-gray-700 hover:text-blue-500 hover:bg-gray-100">
          Timeline
        </Button>
        <Button className="bg-transparent text-gray-700 hover:text-blue-500 hover:bg-gray-100">
          Account
        </Button>
      </div>

      {/* Right Icons */}
      <div className=" flex gap-2 items-center ">
        <NavSearch />
        <div className="hidden md:flex gap-2">
          <House
            className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500"
            onClick={() => navigate("/home")}
          />
          <NavMessenger />
        </div>

        {/* Bell */}
        <div className="  flex items-center gap-1 md:gap-6 ml-6">
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

          <Button
            className="bg-transparent text-gray-700 hover:text-red-500 hover:bg-gray-100"
            onClick={async () => {
              const success = await logout();
              if (success) {
                toast.success("Logout Successfully");
                navigate("/login");
              }
            }}
          >
            <LogOut />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
