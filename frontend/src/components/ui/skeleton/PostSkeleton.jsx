import React from "react";

const PostSkeleton = () => {
  return (
    <div className="w-full max-w-[600px] mx-auto bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4 animate-pulse">
      {/* Header */}
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="ml-3 flex-1">
          <div className="h-3 bg-gray-200 rounded w-1/3 mb-1"></div>
          <div className="h-2 bg-gray-100 rounded w-1/4"></div>
        </div>
      </div>

      {/* Caption / Text */}
      <div className="space-y-2 mb-3">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>

      {/* Image area */}
      <div className="w-full h-64 bg-gray-200 rounded-md mb-3"></div>

      {/* Footer buttons */}
      <div className="flex justify-between mt-2">
        <div className="h-3 w-10 bg-gray-200 rounded"></div>
        <div className="h-3 w-10 bg-gray-200 rounded"></div>
        <div className="h-3 w-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
