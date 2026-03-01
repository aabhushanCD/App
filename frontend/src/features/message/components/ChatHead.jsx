import React from "react";

const ChatHead = ({ user }) => {
  return (
    <div className="flex gap-2 items-center">
      {user.imageUrl ? (
        <img
          src={user.imageUrl}
          alt=""
          className="w-9 h-9 rounded-full object-cover"
        />
      ) : (
        <span className="w-9 h-9 rounded-full border flex items-center justify-center text-white bg-blue-400">
          U
        </span>
      )}
      <h1 className="font-semibold text-sm">{user.name || "User"}</h1>
    </div>
  );
};

export default ChatHead;
