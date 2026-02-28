import React, { Suspense } from "react";
import Navbar from "../NavBar/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { Contact, Home, MessageCircle } from "lucide-react";

const navItems = [
  { icon: Home, path: "/home" },
  {
    icon: Contact,
    path: "/friend",
  },

  { icon: MessageCircle, path: "/messanger" },
];
const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideFooterRoutes = ["/home", "/newsfeeds", "/login"];
  const hideFooter = hideFooterRoutes.includes(location.pathname);
  return (
    <>
      <Navbar />
      <div className="md:hidden flex gap-4 items-center justify-evenly p-2">
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
      <Suspense
        fallback={
          <div className="w-full h-80 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-blue-400 border-dashed rounded-full animate-spin" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
