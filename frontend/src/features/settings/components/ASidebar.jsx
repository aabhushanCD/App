import React from "react";
import { NavLink } from "react-router-dom";

const buttons = [
  { path: "account", name: "Account" },
  { path: "privacy", name: "Privacy" },
  { path: "security", name: "Security" },
  { path: "notification", name: "Notification" },
];

const NavBarLink = ({ btm }) => {
  return (
    <NavLink
      to={btm.path}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-md transition ${
          isActive
            ? "bg-blue-500 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {btm.name}
    </NavLink>
  );
};

const ASidebar = () => {
  return (
    <>
      <aside className="w-64 border-r min-h-screen">
        <div className="pb-8 pt-4 px-4">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-gray-500">Manage your experience</p>
        </div>

        <div className="flex flex-col gap-1 px-2">
          {buttons.map((btm) => (
            <NavBarLink key={btm.path} btm={btm} />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ASidebar;
