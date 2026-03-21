import React from "react";
import { TrendingUp, Hash, UserPlus } from "lucide-react";

const trends = [
  "ReactJS",
  "TailwindCSS",
  "WebDevelopment",
  "JavaScript",
  "NodeJS",
];

const suggestions = [
  {
    id: 1,
    name: "John Carter",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 3,
    name: "Michael Lee",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
];

const RightSideBar = () => {
  return (
    <aside className="sticky top-20 h-fit space-y-6 px-3 py-4">
      {/* Trending */}
      <div className="bg-white rounded-xl border p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-blue-500" />
          <h3 className="font-semibold text-gray-800 text-sm">
            Trending Topics
          </h3>
        </div>

        <ul className="space-y-3">
          {trends.map((trend) => (
            <li
              key={trend}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer transition"
            >
              <Hash size={14} />
              <span className="hover:underline">{trend}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Suggestions */}
      <div className="bg-white rounded-xl border p-5">
        <h3 className="font-semibold text-gray-800 text-sm mb-4">
          Suggested for you
        </h3>

        <div className="space-y-4">
          {suggestions.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </div>

              <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium">
                <UserPlus size={14} />
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-xl border p-5">
        <p className="text-sm text-gray-600 leading-relaxed">
          Connect with developers, share posts, and explore ideas with the
          community.
        </p>
      </div>
    </aside>
  );
};

export default RightSideBar;
