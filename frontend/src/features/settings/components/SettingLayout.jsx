import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "@/components/NavBar/Navbar";
import Sidebar from "./Sidebar";

const SettingLayout = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="flex">
          <Sidebar />

          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingLayout;
