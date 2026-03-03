import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../NavBar/Navbar";
import MobileNav from "../NavBar/MobileNav";
import LeftSideBar from "../LeftSideBar";
import RightSideBar from "../RightSideBar";

const Layout = () => {
  return (
    <>
      {/* Main Layout Container */}
      <div className="flex min-h-screen bg-gray-50">
        {/* Left Sidebar - Desktop */}
        <aside className="hidden md:block md:w-[22%] lg:w-[20%] border-r border-gray-200 bg-white">
          <LeftSideBar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Navbar */}
          <header className="bg-white shadow-sm z-10 sticky top-0">
            <Navbar />
          </header>

          {/* Page Content */}
          <section className="flex flex-1 justify-center gap-8 md:px-4 pb-20 md:pb-6 bg-gradient-to-l from-blue-50 via-white to-green-50">
            <Suspense
              fallback={
                <div className="w-full flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-blue-400 border-dashed rounded-full animate-spin" />
                </div>
              }
            >
              <div className="w-full max-w-6xl">
                <Outlet />
              </div>
            </Suspense>

            {/* Right Sidebar - Large Screens */}
            <aside className="hidden lg:block lg:w-[300px] ml-8 border-l border-gray-200 bg-white rounded-md p-4 shadow-sm">
              <RightSideBar />
            </aside>
          </section>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <footer className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-t z-50">
        <MobileNav />
      </footer>
    </>
  );
};

export default Layout;
