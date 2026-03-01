// components/navbar/NavMessenger.jsx
import { memo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";

import ChatBox from "@/features/message/ChatBox";
import { getAllFriends } from "@/features/friend/friend.service";
import MessangerBox from "@/features/message/MessangerBox";

const NavMessenger = () => {
  const [showMessanger, setShowMessanger] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [miniChat, setMiniChat] = useState({ open: false, user: {} });

  // Toggle messenger dropdown and fetch friends
  const toggleMessenger = async () => {
    setShowMessanger(!showMessanger);

    if (!showMessanger) {
      try {
        const res = await getAllFriends();
        if (res.status === 200) setAllUsers(res.data.friend);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch friends",
        );
      }
    }
  };

  return (
    <div className="relative">
      <MessageCircle
        className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500"
        onClick={toggleMessenger}
      />

      {/* Messenger Dropdown */}
      {showMessanger && (
        <div className="absolute md:top-11 md:right-0 w-100 -left-75 inset-0 top-11  h-auto  bg-white shadow-2xl rounded-md z-50">
          <MessangerBox
            allUsers={allUsers}
            setMiniChat={setMiniChat}
            setShowMessanger={setShowMessanger}
          />
        </div>
      )}

      {/* Mini Chat Window */}
      {miniChat.open && (
        <div className="fixed bottom-4 right-4 w-[380px] h-[75vh] bg-white shadow-2xl rounded-t-2xl z-60 flex flex-col overflow-hidden">
          <ChatBox user={miniChat.user} setMiniChat={setMiniChat} />
        </div>
      )}
    </div>
  );
};

export default memo(NavMessenger);
