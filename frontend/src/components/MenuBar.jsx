import React from "react";
import {
  Home,
  Users,
  MessageCircle,
  Search,
  Newspaper,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/authContext";

export default function MenuBar({ onLogout }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { label: "Home", icon: Home, path: "/home" },
    { label: "News Feed", icon: Newspaper, path: "/newsfeeds" },
    { label: "Friends", icon: Users, path: "/friend" },
    { label: "Messenger", icon: MessageCircle, path: "/messanger" },
    { label: "Search", icon: Search, path: "/search" },
  ];

  const handleLogout = async () => {
     await logout();
  };
  return (
    <div className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden md:hidden">
      {/* Menu Items */}
      <div className="flex flex-col">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Logout */}
      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
      >
        <LogOut size={20} />
        <span className="text-sm font-medium" onClick={handleLogout}>
          Logout
        </span>
      </button>
    </div>
  );
}
