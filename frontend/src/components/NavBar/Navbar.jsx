import React, {
  lazy,
  memo,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { House, LogOut, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/authContext";

import NavSearch from "./NavSearch";
import MenuBar from "../MenuBar";
import ToggleMenu from "../ToggleMenu";

const NavMessenger = lazy(() => import("./NavMessanger"));
const NavNotification = lazy(() => import("./NavNotification"));

const Navbar = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const menuRef = useRef();
  const [profileClick, setProfileClick] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-blue-100 via-white to-purple-50 shadow-md z-50">
      {/* Left / Logo placeholder */}
      {/* Logo */}
      <div className="">
        <Link
          to="/home"
          className="text-4xl font-mono text-blue-500 tracking-wide"
        >
          Gen-Z
        </Link>
      </div>
      <div className="flex items-center">
        <h1
          className="text-xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/home")}
        ></h1>
      </div>

      {/* Center Navigation - Desktop */}
      <div className="hidden md:flex gap-6">
        {["Home", "Timeline", "Account"].map((item) => (
          <Button
            key={item}
            className="bg-transparent text-gray-700 hover:text-blue-500 hover:bg-gray-100 transition-colors"
            onClick={() => navigate(item.toLowerCase())}
          >
            {item}
          </Button>
        ))}
      </div>

      {/* Right Icons / Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <NavSearch />

        {/* Desktop Icons */}
        {/* <div className="hidden md:flex items-center gap-4 ml-4">
            <House
              className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500 transition-colors"
              onClick={() => navigate("/home")}
            />

            <Suspense
              fallback={
                <div className="w-5 h-5 rounded-full bg-gray-300 animate-pulse" />
              }
            >
              <NavMessenger />
              <NavNotification />
            </Suspense>

            <Button
              className="bg-transparent text-gray-700 hover:text-red-500 hover:bg-gray-100 transition-colors"
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
          </div> */}
        <NavNotification />
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full bg-black cursor-pointer"
            onClick={() => setProfileClick(!profileClick)}
          >
            {currentUser.imageUrl ? (
              <img
                src={currentUser?.imageUrl}
                className="rounded-full w-10 h-10 "
                alt=""
              />
            ) : (
              <div className="text-white flex items-center p-2  justify-center">
                {currentUser.name[0]}
              </div>
            )}
          </div>
          {profileClick && (
            <div className="absolute top-10 z-1000 right-0 flex flex-col gap-2  border p-2 w-50 bg-gray-50  text-gray-700 rounded-2xl">
              <Button variant="outlined" className={"border hover:bg-white"}>
                Profile
              </Button>
              <Button variant="outlined" className={"border hover:bg-white "}>
                Message
              </Button>
              <Button
                variant="outlined"
                className={"border  hover:bg-white"}
                onClick={async () => {
                  const success = await logout();
                  if (success) {
                    toast.success("Logout Successfully");
                    navigate("/login");
                  }
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="relative md:hidden" ref={menuRef}>
          {!isMobileMenu ? (
            <Menu
              className="w-6 h-6 cursor-pointer text-gray-700 hover:text-blue-500 transition-colors"
              onClick={() => setIsMobileMenu(true)}
            />
          ) : (
            <X
              className="w-6 h-6 cursor-pointer text-gray-700 hover:text-blue-500 transition-colors"
              onClick={() => setIsMobileMenu(false)}
            />
          )}

          {isMobileMenu && (
            <div className="absolute top-10 right-0 w-48 bg-white shadow-lg rounded-md p-4 flex flex-col gap-2">
              <MenuBar />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
