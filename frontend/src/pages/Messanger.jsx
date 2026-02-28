import MessangerContainer from "@/containers/MessangerContainer";

// import { Button } from "@/components/ui/button";
import { ServerApi } from "@/utils/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import ChatBox from "@/containers/ChatBox";

const Messanger = () => {
  const [isMiniMessagner, setMiniMessagner] = useState({
    open: false,
    user: {},
  });
  const [allUsers, setAllUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${ServerApi}/friend/getAllFriends`,

        {
          withCredentials: true,
        },
      );
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
        className={`sm:w-[30%] w-full  ${
          isMiniMessagner.open ? "hidden  sm:block " : ""
        }`}
      >
        <MessangerContainer
          allUsers={allUsers}
          setMiniChat={setMiniMessagner}
        />
      </div>
      {isMiniMessagner.open && (
        <div className="md:w-[70%] w-full min-h-screen  z-50 sm:z-10">
          <ChatBox user={isMiniMessagner.user} setMiniChat={setMiniMessagner} />
        </div>
      )}
    </div>
  );
};

export default Messanger;
