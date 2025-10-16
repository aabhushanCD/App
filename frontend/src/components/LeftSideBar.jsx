import React from "react";
import { useNavigate } from "react-router-dom";

const LeftSideBar = () => {
  const navigate = useNavigate();
  return (
    <div className="hidden  md:flex z-10 w-full flex-col overflow-auto border-r border-gray-200 dark:border-gray-700">
      <div>
        <h1 className="text-3xl border-b">SHORTCUTS</h1>
      </div>
      <div className="flex flex-col items-start">
        <button onClick={() => navigate("/newsfeeds")}>News Feed</button>
        <button className="line-through">Inbox</button>

        <button onClick={() => navigate("/friend")}>Friends</button>

        <button className="" onClick={() => navigate("/messanger")}>
          Messanger
        </button>
        <button className="line-through">Notifications</button>

        <button>Logout</button>
      </div>
      <div></div>
    </div>
  );
};

export default LeftSideBar;
