import LeftSideBar from "@/components/LeftSideBar";
import { Button } from "@/components/ui/button";
import { ServerApi } from "@/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { toast } from "sonner";

const FriendContainer = () => {
  const [allUsers, setAllUsers] = useState({
    title: "",
    data: [],
  });

  const fetchUser = async () => {
    if (allUsers.title == "Add Friends") return;
    try {
      const res = await axios.get(`${ServerApi}/friend/getAllUsers`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setAllUsers({ title: "Add Friends", data: res.data.users });
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  // Send Friend request
  const handleSendRequest = async (user) => {
    try {
      const res = await axios.post(
        `${ServerApi}/friend/sendRequest/${user._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        toast.success("Friend Request Sent Successfully");
      }
    } catch (error) {
      console.error(
        error?.response?.data?.message || "Problem in Sending friend Request"
      );
      toast.error(
        error?.response?.data?.message || "Problem in Sending friend Request"
      );
    }
  };
  // Friend request Accept
  const handleAcceptRequest = async (friendId) => {
    try {
      const res = await axios.post(
        `${ServerApi}/friend/acceptRequest/${friendId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(
        error?.response?.data?.message || "Problem in accept friend request"
      );
      toast.error(
        error?.response?.data?.message || "Problem in accept friend request"
      );
    }
  };
  // get all Friend Request
  const handleFriendRequest = async () => {
    if (allUsers.title == "Friend Request") return;
    try {
      const res = await axios.get(`${ServerApi}/friend/getAllRequest`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setAllUsers(() => ({
          title: "Friend Request",
          data: res.data.receivedRequest,
        }));
      }
    } catch (error) {
      console.error(
        error?.response?.data.message | "problem in getting friend request"
      );
      toast.error(
        error?.response?.data.message | "problem in getting friend request"
      );
    }
  };

  //get all Fiends
  const handleAllFriends = async () => {
    if (allUsers.title == "All Friends") return;
    try {
      const res = await axios.get(`${ServerApi}/friend/getAllFriends`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setAllUsers(() => ({
          title: "All Friends",
          data: res.data.friend,
        }));
      }
    } catch (error) {
      console.error(
        error?.response?.data?.message || "Problem in getting All friend "
      );
      toast.error(
        error?.response?.data?.message || "Problem in getting All friend"
      );
    }
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex gap-5  font-semibold justify-center">
        <button
          onClick={handleAllFriends}
          className={`${
            allUsers.title === "All Friends"
              ? "border-b-blue-400 border-b-4"
              : " "
          }`}
        >
          All Friends
        </button>
        <button
          onClick={handleFriendRequest}
          className={`${
            allUsers.title === "Friend Request"
              ? "border-b-blue-400 border-b-4"
              : " "
          }`}
        >
          Friend Requests
        </button>
        <button
          onClick={fetchUser}
          className={`${
            allUsers.title === "Add Friends"
              ? "border-b-blue-400 border-b-4"
              : " "
          }`}
        >
          Add Friends
        </button>
      </div>
      {allUsers.title === "Add Friends" && (
        <div className=" grid grid-cols-2 md:flex flex-wrap gap-4 p-3 overflow-auto justify-center md:justify-start">
          {allUsers?.data?.map((user) => (
            <div
              key={user._id}
              className="md:w-56 max-h-70 min-h-70 border  flex flex-col justify-between items-center
              hover:scale-105 transition-transform duration-300"
            >
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  className="min-w-full max-h-40  min-h-40  object-cover"
                />
              ) : (
                <span className=" flex items-center justify-center border min-w-full md:min-w-full max-h-40 max-w-40 min-h-40  bg-gray-500 ">
                  U
                </span>
              )}

              <h1 className={" font-bold text-center"}>{user.name}</h1>

              <div className="flex gap-1 p-2  flex-col justify-center">
                <Button
                  onClick={() => handleSendRequest(user)}
                  className={
                    "hover:text-blue-400 bg-blue-400 active:bg-green-600 active:text-white"
                  }
                >
                  Send Request
                </Button>
                <Button className={" text-white bg-red-400"}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {allUsers.title === "All Friends" && (
        <div className=" grid grid-cols-2 md:flex flex-wrap gap-4 p-3 overflow-auto">
          {allUsers?.data?.map((user) => (
            <div
              key={user._id}
              className="md:w-56  border flex flex-col  items-center
            hover:scale-105 transition-transform duration-300 "
            >
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  className="min-w-full max-h-40  min-h-40  object-cover"
                />
              ) : (
                <span className=" flex items-center justify-center border h-40  w-full  bg-gray-500 ">
                  U
                </span>
              )}
            
                <h1 className={" font-semibold text-center"}>{user.name}</h1>
        
            </div>
          ))}
        </div>
      )}
      {allUsers.title === "Friend Request" && (
        <div className="flex flex-wrap gap-4 p-3 overflow-auto">
          {allUsers?.data?.map((user) => (
            <div
              key={user._id}
              className="w-56 h-80 border rounded-2xl flex flex-col justify-between items-center
             hover:scale-105 transition-transform duration-300"
            >
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  className="min-w-full max-h-40  min-h-40 rounded-t-2xl object-cover"
                />
              ) : (
                <span className=" flex items-center justify-center border min-w-40 max-h-40 max-w-40 min-h-40 rounded-full bg-gray-500 ">
                  U
                </span>
              )}
              <div className="flex  justify-center">
                <h1 className={" font-semibold"}>{user.name}</h1>
              </div>
              <div className="flex gap-1 p-2  flex-col justify-center">
                <Button
                  onClick={() => handleAcceptRequest(user._id)}
                  className={"bg-blue-950 hover:bg-green-800"}
                >
                  Accept Request
                </Button>
                <Button className={"bg-gray-400 text-white "}>Reject</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendContainer;
