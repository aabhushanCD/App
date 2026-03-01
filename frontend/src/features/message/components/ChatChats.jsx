import React from "react";

const ChatChats = ({ dd, currentUser }) => {
  return (
    <div
      key={dd._id}
      className={`${
        dd.senderId === currentUser.userId
          ? "self-end bg-blue-500 text-white ml-auto"
          : "self-start bg-gray-200 text-gray-800 "
      } px-3 py-2 rounded-2xl w-fit break-words shadow-sm text-sm`}
    >
      {dd.media && (
        <img
          src={dd.media}
          alt="media"
          className="w-36 rounded-md mb-1 object-cover"
        />
      )}
      {dd.text}
    </div>
  );
};

export default ChatChats;
