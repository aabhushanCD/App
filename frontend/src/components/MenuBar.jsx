import React, { useState } from "react";
import {
  Home,
  LogOut,
  Users,
  MessageCircle,
  Search,
  Newspaper,
} from "lucide-react";

export default function MenuBar({ onLogout }) {
  const [active, setActive] = useState("home");

  const menuItems = [
    { id: "home", label: "Home", icon: <Home size={20} /> },
    { id: "newsfeed", label: "Newsfeed", icon: <Newspaper size={20} /> },
    { id: "friends", label: "Friends", icon: <Users size={20} /> },
    { id: "messenger", label: "Messenger", icon: <MessageCircle size={20} /> },
    { id: "search", label: "Search", icon: <Search size={20} /> },
  ];

  return (
    <div className=" flex items-center justify-between bg-white border-t border-gray-200 px-4 py-2 fixed bottom-0 left-0 right-0 shadow-sm md:static md:rounded-xl md:w-[320px] md:flex-col md:h-screen md:justify-start md:gap-4">
      {/* Menu Buttons */}
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            active === item.id
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {item.icon}
          <span className="hidden md:inline text-sm font-medium">
            {item.label}
          </span>
        </button>
      ))}

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200"
      >
        <LogOut size={20} />
        <span className="hidden md:inline text-sm font-medium">Logout</span>
      </button>
    </div>
  );
}
