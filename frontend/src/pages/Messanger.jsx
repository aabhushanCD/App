import MessangerContainer from "@/components/MessangerContainer";
import MiniMessanger from "@/components/MiniMessanger";
import { Button } from "@/components/ui/button";
import { ServerApi } from "@/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Messanger = () => {
  const [isMiniMessagner, setMiniMessagner] = useState({
    open: false,
    user: {},
  });
  const [allUsers, setAllUsers] = useState([]);
  const [showMessanger, setShowMessanger] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${ServerApi}/friend/getAllFriends`,

        {
          withCredentials: true,
        }
      );
      setAllUsers(res.data.friend);
    } catch (error) {
      console.error(
        error?.response?.data?.message || "Problem fetching all friends"
      );
      toast.error(
        error?.response?.data?.message || "Problem fetching all friends"
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="flex h-screen ">
      <div
        className={`md:w-[30%] w-full ${isMiniMessagner.open ? "hidden" : ""}`}
      >
        <MessangerContainer
          allUsers={allUsers}
          setMiniMessagner={setMiniMessagner}
          setShowMessanger={setShowMessanger}
        />
      </div>
      {isMiniMessagner.open && (
        <div className="md:w-[70%] w-full h-full z-1000">
          <MiniMessanger
            user={isMiniMessagner.user}
            setMiniMessagner={setMiniMessagner}
          />
        </div>
      )}
    </div>
  );
};

export default Messanger;
