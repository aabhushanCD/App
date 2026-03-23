import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../NavBar/Navbar";
import MobileNav from "../NavBar/MobileNav";
import LeftSideBar from "../LeftSideBar";
import RightSideBar from "../RightSideBar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <Navbar />
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 max-w-7xl w-full mx-auto">
        {/* Left Sidebar */}
        <aside className="hidden md:block md:w-[240px] border-r bg-white">
          <LeftSideBar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-6 py-4 bg-gradient-to-l from-blue-50 via-white to-green-50">
          <Suspense
            fallback={
              <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-4 border-blue-400 border-dashed rounded-full animate-spin" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block w-[280px] border-l bg-white">
          <RightSideBar />
        </aside>
      </div>

      {/* Mobile Navigation */}
      <footer className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t z-50">
        <MobileNav />
      </footer>
    </div>
  );
};

export default Layout;
