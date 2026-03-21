import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Users, MessageCircle, Bell, LogOut, Newspaper } from "lucide-react";

const menuItems = [
  { name: "News Feed", path: "/newsfeeds", icon: Newspaper },
  { name: "Friends", path: "/friend", icon: Users },
  { name: "Messenger", path: "/messanger", icon: MessageCircle },
];

const LeftSideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="h-[calc(100vh-64px)] sticky top-16 border-r bg-white px-4 py-6 flex flex-col">
      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1">
        {menuItems.map(({ name, path, icon: Icon }) => {
          const isActive = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              <Icon size={20} />
              {name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t pt-4 flex flex-col gap-1">
        <button
          onClick={() => navigate("/notification")}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition"
        >
          <Bell size={20} />
          Notifications
        </button>

        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default LeftSideBar;
