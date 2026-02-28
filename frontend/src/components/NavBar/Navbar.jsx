import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { House, LogOut } from "lucide-react";
import { toast } from "sonner";
import React, { lazy, memo, Suspense } from "react";
import { useAuth } from "@/features/auth/authContext";

import NavSearch from "./NavSearch";
// import NavMessenger from "./NavBar/NavMessanger";
// import NavNotification from "./NavNotification";

const NavMessenger = lazy(() => import("./NavMessanger"));
const NavNotification = lazy(() => import("./NavNotification"));

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Audio/video calling setup

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
        {/* Navigation Search every thing in this component */}
        <NavSearch />
        <div className="hidden md:flex gap-2">
          <House
            className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500"
            onClick={() => navigate("/home")}
          />
        </div>

        {/* Bell */}
        <div className="  flex items-center gap-1 md:gap-6 ml-6">
          <Suspense
            fallback={
              <div className="w-5 h-5 rounded-full bg-gray-300 animate-pulse" />
            }
          >
            <NavMessenger />
            <NavNotification />
          </Suspense>

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

export default memo(Navbar);
