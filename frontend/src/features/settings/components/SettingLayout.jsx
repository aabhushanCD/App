import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "@/components/NavBar/Navbar";
import ASidebar from "./ASidebar";

const SettingLayout = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="flex">
          <ASidebar />

          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingLayout;
