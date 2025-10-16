import { ServerApi } from "@/constants";
import axios from "axios";
import { Ellipsis, Search } from "lucide-react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const MessangerContainer = ({
  setMiniMessagner,
  setShowMessanger,
  allUsers,
}) => {
  const location = useLocation();
  return (
    <div
      className={`${
        location.pathname === "/messanger" && "h-screen"
      } bg-gray-50 rounded-2xl  shadow-2xl `}
    >
      <div className="flex flex-col gap-3 p-4  h-130">
        <div className=" flex gap-3 justify-between items-center ">
          <h1 className="flex font-bold text-3xl">Chats</h1>
          <div className="flex gap-3">
            <Ellipsis />
            <button>B</button>
          </div>
        </div>
        <div className="flex gap-2 bg-gray-200 text-gray-500 rounded-2xl p-1">
          <Search />
          <input
            type="text"
            className="w-full border-none outline-none"
            placeholder="Write Something..."
          />
        </div>
        <div className="flex  font-semibold flex-wrap ">
          <button className="rounded-2xl active:bg-gray-200 p-2 ">All</button>
          <button className="rounded-2xl active:bg-gray-200 p-2 ">
            Unread
          </button>
          <button className="rounded-2xl active:bg-gray-200 p-2 ">
            Groups
          </button>
          <button className="rounded-2xl active:bg-gray-200 p-2 ">
            Communities
          </button>
        </div>

        <div className="overflow-auto h-auto">
          {allUsers.map((uj) => (
            <div
              key={uj._id}
              className="flex items-center rounded-2xl hover:bg-gray-100"
              onClick={() => {
                setMiniMessagner({ open: true, user: uj });
                setShowMessanger(false);
              }}
            >
              <div className=" flex w-12 h-12 border-2 rounded-full overflow-hidden ">
                {uj.imageUrl ? (
                  <img
                    src={uj.imageUrl}
                    alt=""
                    className=" w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full text-gray-500 text-sm font-medium">
                    {uj.name?.[0]?.toUpperCase() || "?"}
                  </span>
                )}
              </div>
              <div className="p-2">
                <h1 className="font-semibold">{uj.name}</h1>
                <p>{"Write a message..."}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessangerContainer;
