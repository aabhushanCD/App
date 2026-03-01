import React from "react";
import { TrendingUp, Hash } from "lucide-react";

const trends = ["ReactJS", "TailwindCSS", "WebDevelopment", "JavaScript"];

const RightSideBar = () => {
  return (
    <div className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-4">
      <div className="bg-white rounded-2xl border shadow-sm p-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-blue-500" />
          <h3 className="font-semibold text-gray-800">Trending Topics</h3>
        </div>

        {/* Trending List */}
        <ul className="space-y-3">
          {trends.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer transition"
            >
              <Hash size={14} />
              <span className="hover:underline">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Extra Card (Optional) */}
      <div className="bg-white rounded-2xl border shadow-sm p-5 mt-6">
        <h3 className="font-semibold text-gray-800 mb-3">Suggestions</h3>
        <p className="text-sm text-gray-600">
          Follow developers and explore new technologies to grow your network.
        </p>
      </div>
    </div>
  );
};

export default RightSideBar;
