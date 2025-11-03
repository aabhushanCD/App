import React from "react";
import Navbar from "../Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import LeftSideBar from "../LeftSideBar";
import { Contact, Home, MessageCircle } from "lucide-react";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideFooter = location.pathname === "/home" || "/newsfeeds";
  return (
    <>
      <Navbar />
      <div className="md:hidden flex gap-4 items-center justify-evenly p-2">
        <Home
          size={20}
          onClick={() => navigate("/home")}
          className={`${location.pathname === "/home" ? "text-blue-400" : ""}`}
        />
        <Contact
          size={20}
          onClick={() => navigate("/friend")}
          className={`${
            location.pathname === "/friend" ? "text-blue-400" : ""
          }`}
        />
        <MessageCircle size={20} />
      </div>
      <Outlet />

      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
