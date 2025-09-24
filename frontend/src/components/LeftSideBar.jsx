import React from "react";

const LeftSideBar = () => {
  return (
    <div className="hidden md:flex z-10 w-[20.33%] flex-col overflow-auto border-r border-gray-200 dark:border-gray-700">
      <div>
        <h1 className="text-3xl border-b">SHORTCUTS</h1>
      </div>
      <div className="flex flex-col items-start">
        <button>News Feed</button>
        <button>Inbox</button>
        <button>MyPages</button>
        <button>Friends</button>
        <button>Images</button>
        <button>Videos</button>
        <button>Messages</button>
        <button>Notifications</button>
        <button>People Nearby</button>
        <button>Insights</button>
        <button>Logout</button>
      </div>
      <div></div>
    </div>
  );
};

export default LeftSideBar;
