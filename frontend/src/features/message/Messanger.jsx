import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ChatBox from "@/features/message/ChatBox";
import { getAllFriends } from "../friend/friend.service";
import MessangerBox from "@/features/message/MessangerBox";

const Messanger = () => {
  const [isMiniMessagner, setMiniMessagner] = useState({
    open: false,
    user: {},
  });
  const [allUsers, setAllUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await getAllFriends();
      setAllUsers(res.data.friend);
    } catch (error) {
      console.error(
        error?.response?.data?.message || "Problem fetching all friends",
      );
      toast.error(
        error?.response?.data?.message || "Problem fetching all friends",
      );
    }
  };
  document.body.style.overflow = "auto";
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="flex flex-2 h-full">
      <div
        className={`sm:w-[30%] md:w-100   ${
          isMiniMessagner.open ? "hidden  sm:block " : ""
        }`}
      >
        <MessangerBox allUsers={allUsers} setMiniChat={setMiniMessagner} />
      </div>
      {isMiniMessagner.open && (
        <div className=" w-full   z-50 sm:z-10">
          <ChatBox user={isMiniMessagner.user} setMiniChat={setMiniMessagner} />
        </div>
      )}
    </div>
  );
};

export default Messanger;
