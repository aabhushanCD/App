import React, { Suspense } from "react";
import Navbar from "../NavBar/Navbar";
import { Outlet } from "react-router-dom";

import MobileNav from "../NavBar/MobileNav";
import LeftSideBar from "../LeftSideBar";
import RightSideBar from "../RightSideBar";

const Layout = () => {
  // const location = useLocation();

  // const hideFooterRoutes = ["/home", "/newsfeeds", "/login"];
  // const hideFooter = hideFooterRoutes.includes(location.pathname);
  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        {/* Left Sidebar - Desktop Only */}
        <div className="hidden md:block md:w-[22%] lg:w-[20%] border-r bg-white">
          <LeftSideBar />
        </div>

        {/* Main Section */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <div className="flex flex-1 justify-center  md:px-0 pb-20 md:pb-6  bg-gradient-to-l from-blue-100 via-white to-green-100">
            <Suspense
              fallback={
                <div className="w-full h-80 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-blue-400 border-dashed rounded-full animate-spin" />
                </div>
              }
            >
              <div className="w-full max-w-6xl">
                <Outlet />
              </div>
            </Suspense>

            {/* Right Sidebar - Large Screens Only */}
            <div className="hidden lg:block lg:w-[300px] ml-8">
              <RightSideBar />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50">
        <MobileNav />
      </div>
    </>
  );
};

export default Layout;
