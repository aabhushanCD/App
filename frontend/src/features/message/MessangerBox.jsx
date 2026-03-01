import { Ellipsis, Search } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MessangerBox = ({ setMiniChat, allUsers, setShowMessanger }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className={`${
        location.pathname === "/messanger" ? "h-screen" : "h-150 "
      }  bg-white w-full shadow-2xl  flex flex-col`}
    >
      <div className="flex flex-col h-full">
        <div className="sticky  top-0 bg-white flex flex-col gap-3 p-4 ">
          <div className=" flex gap-3 justify-between items-center ">
            {location.pathname === "/messanger" ? (
              <h1
                className="flex font-bold text-3xl text-blue-600 cursor-pointer"
                onClick={() => navigate("/home")}
              >
                Hello's
              </h1>
            ) : (
              <h1 className="flex font-bold text-3xl text-blue-600 ">Chat's</h1>
            )}
            <div className="flex gap-3">
              <Ellipsis />
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
          <div className=" hidden md:flex  font-semibold flex-wrap ">
            {["All", "Unread", "Groups", "Communities"].map((btm, index) => (
              <button
                className="rounded-2xl active:bg-gray-200 p-2"
                key={index}
              >
                {btm}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-auto h-auto flex flex-col gap-2">
          {allUsers.map((uj) => (
            <div
              key={uj._id}
              className=" flex flex-wrap gap-2 items-center rounded-2xl p-2 hover:bg-blue-300 cursor-pointer"
              onClick={() => {
                setMiniChat({ open: true, user: uj });
                location.pathname === "messanger"
                  ? ""
                  : setShowMessanger(false);
              }}
            >
              <div className=" flex  w-12 h-12 border-2 rounded-full overflow-hidden ">
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
              <div className="p-1">
                <h1 className="font-semibold">{uj.name}</h1>
                <p className="hidden md:block text-gray-500">
                  {"Write a message..."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessangerBox;
