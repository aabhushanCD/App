import { useEffect, useRef, useState } from "react";
import { data, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Bell,
  House,
  Menu,
  MessageCircle,
  Search,
  Ellipsis,
  X,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/store/AuthStore";
import { toast } from "sonner";
import { ServerApi } from "@/constants";
import axios from "axios";
import { useNotify } from "@/store/NotificationStore";
import MessangerContainer from "@/components/MessangerContainer";
import MiniMessanger from "./MiniMessanger";

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
  const socket = useNotify();
  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      toast.success("Logout Successfully");
      navigate("/login");
    }
  };

  // Audio/video calling setup

  useEffect(() => {
    if (!socket) return;

    socket.on("notification", (data) => {
      if (data) {
        setNotification(true);
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
      const res = await axios.get(`${ServerApi}/friend/getAllFriends`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setAllUsers(res.data.friend);
      }
    } catch (error) {
      console.error(
        error?.response?.data?.message || "Problem in getting All friend "
      );
      toast.error(
        error?.response?.data?.message || "Problem in getting All friend"
      );
    }
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <a
          href="/home"
          className="bg-transparent text-blue-500 text-2xl font-bold hover:bg-transparent"
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
        <Button
          className="bg-transparent text-gray-700 hover:text-red-500 hover:bg-gray-100"
          onClick={handleLogout}
        >
          <LogOut />
        </Button>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-5">
        <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500" />
        <House className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500" />
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
          ></MessageCircle>
          {newMessageNotification.open && (
            <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
          )}
          {showMessanger && (
            <div className="absolute w-90 min-h-70 -left-61">
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
              <MiniMessanger
                user={isMiniMessagner.user}
                setMiniMessagner={setMiniMessagner}
              />
            </div>
          )}
        </div>

        {/* Bell */}
        <div className="flex items-center gap-1 md:gap-6 ml-6">
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
              <div className="absolute right-3 mt-2 border w-80 rounded-2xl bg-amber-100 shadow-lg">
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

                  <div className="mt-3  space-y-3 max-h-100 overflow-y-auto">
                    {notificationData.length > 0 ? (
                      notificationData.map((item, index) => (
                        <div
                          key={index}
                          className="flex gap-3 items-start border-b pb-2"
                        >
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
                                  {item.senderId?.name
                                    ?.charAt(0)
                                    .toUpperCase() || "U"}
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
                            <span className="font-semibold">
                              {item.senderId?.name || "Someone"}
                            </span>{" "}
                            {item.message || "sent you a notification"}
                            <p className="text-xs text-gray-500">
                              {new Date(item.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        No notifications yet
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Menu className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
