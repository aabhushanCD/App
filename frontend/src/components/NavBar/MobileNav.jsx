import React from "react";
import { useNavigate } from "react-router-dom";
import { Contact, Home, MessageCircle } from "lucide-react";
const navItems = [
  { icon: Home, path: "/home" },
  {
    icon: Contact,
    path: "/friend",
  },

  { icon: MessageCircle, path: "/messanger" },
];
const MobileNav = () => {
  const navigate = useNavigate();
  return (
    <div className=" flex gap-4 items-center justify-evenly p-2">
      {navItems.map(({ icon, path }) => {
        const Icon = icon;
        return (
          <Icon
            key={path}
            size={25}
            onClick={() => navigate(path)}
            className={`${location.pathname === path ? "text-blue-400" : ""} cursor-pointer`}
          />
        );
      })}
    </div>
  );
};

export default MobileNav;
