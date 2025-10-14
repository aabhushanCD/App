import React from "react";
import Navbar from "../Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer";
import LeftSideBar from "../LeftSideBar";

const Layout = () => {
  const location = useLocation();
  const hideFooter = location.pathname === "/home" || "/newsfeeds";
  return (
    <>
      <Navbar />

      <Outlet />

      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
