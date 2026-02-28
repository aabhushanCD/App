import React from "react";

const RightSideBar = () => {
  return (
    <div className="hidden lg:block w-64">
      <div className="bg-white rounded-2xl border shadow-sm p-4">
        <h3 className="font-semibold text-gray-700 mb-3">Trending</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>#ReactJS</li>
          <li>#TailwindCSS</li>
          <li>#WebDev</li>
        </ul>
      </div>
    </div>
  );
};

export default RightSideBar;
