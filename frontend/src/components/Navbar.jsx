import {  useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Bell, House, MessageCircle, Search, LogOut } from "lucide-react";
// import { useAuth } from "@/store/AuthStore";
import { toast } from "sonner";
import { ServerApi } from "@/utils/constants";
import axios from "axios";

import MessangerContainer from "@/containers/MessangerContainer";

// import SearchBox from "./SearchBox";

import Notification from "./Notification";
import { getAllFriends } from "@/features/friend/friend.service";
import { useAuth } from "@/features/auth/authContext";
import ChatBox from "@/containers/ChatBox";
import NavSearch from "./NavBar/NavSearch";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isNotification, setNotification] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [showMessanger, setShowMessanger] = useState(false);
  const [newMessageNotification, setNewMessageNotification] = useState({
    open: false,
    newMessage: [],
  });

  const [isMiniMessagner, setMiniMessagner] = useState({
    open: false,
    user: {},
  });

  const [allUsers, setAllUsers] = useState([]);
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
    setShowMessanger(false);
  };
  const handleNotificationClose = () => {
    setBellOpen(false);
  };

  const fetchUsers = async () => {
    if (showMessanger) return setShowMessanger(false);
    setShowMessanger(!showMessanger);
    setBellOpen(false);
    try {
      const res = await getAllFriends();
      if (res.status === 200) {
        setAllUsers(res.data.friend);
      }
    } catch (error) {
      console.error(
        error?.response?.data?.message || "Problem in getting All friend ",
      );
      toast.error(
        error?.response?.data?.message || "Problem in getting All friend",
      );
    }
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
          <div
            className={`relative ${
              location.pathname === "/messanger" && "hidden"
            }`}
          >
            <MessageCircle
              className={`w-5 h-5 ${
                newMessageNotification ? "relative" : ""
              } text-gray-600 cursor-pointer hover:text-blue-500`}
              onClick={fetchUsers}
            />
            {newMessageNotification.open && (
              <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
            )}
            {showMessanger && (
              <div className="absolute w-90 top-11 min-h-70 -left-61">
                <MessangerContainer
                  newMessageNotification={newMessageNotification}
                  allUsers={allUsers}
                  setMiniMessagner={setMiniMessagner}
                  setShowMessanger={setShowMessanger}
                />
              </div>
            )}
            {isMiniMessagner.open && (
              <div
                className="
                    fixed bottom-0 right-3 
                      w-[95%] h-[90vh] 
                      md:w-[380px] md:h-[75vh] md:right-4 md:bottom-4 
                      bg-white shadow-2xl rounded-t-2xl border border-gray-200
                      z-[60] flex flex-col transition-all duration-300 overflow-hidden
                    "
              >
                <ChatBox
                  user={isMiniMessagner.user}
                  setMiniMessagner={setMiniMessagner}
                />
              </div>
            )}
          </div>
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
                setNewMessageNotification={setNewMessageNotification}
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
