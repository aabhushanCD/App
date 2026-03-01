import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  MessageCircle,
  Bell,
  LogOut,
  Newspaper,
} from "lucide-react";

const menuItems = [
  { name: "News Feed", path: "/newsfeeds", icon: Newspaper },
  { name: "Friends", path: "/friend", icon: Users },
  { name: "Messenger", path: "/messanger", icon: MessageCircle },
];

const LeftSideBar = () => {
  const location = useLocation();

  return (
    <div className="sticky top-0 h-screen w-full border-r bg-linear-to-b from-blue-200 via-green-50 to-blue-100 px-6 py-6 flex flex-col">
      {/* Logo */}
      <div className="mb-10">
        <Link
          to="/home"
          className="text-3xl font-extrabold text-blue-500 tracking-wide"
        >
          Hell'O
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-2 flex-1">
        {menuItems.map(({ name, path, icon }) => {
          const Icon = icon;
          const isActive = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              <Icon size={20} />
              <span>{name}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="border-t pt-5 flex flex-col gap-2">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition">
          <Bell size={20} />
          Notifications
        </button>

        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default LeftSideBar;
