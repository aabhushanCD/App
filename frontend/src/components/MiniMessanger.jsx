import { ServerApi } from "@/constants";
import { useAuth } from "@/store/AuthStore";
import { useNotify } from "@/store/NotificationStore";
import axios from "axios";
import {
  GalleryHorizontal,
  LucideVoicemail,
  Phone,
  Video,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const MiniMessanger = ({ setMiniMessagner, user }) => {
  const { currentUser } = useAuth();
  const socket = useNotify();
  const [messages, setMessages] = useState([]);
  const textInputRef = useRef();
  const chatContainerRef = useRef();
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(`${ServerApi}/message/${user._id}`, {
        withCredentials: true,
      });
      setMessages(res.data.messages);
    };
    fetchMessages();
  }, [user]);

  const handleSentMessage = async () => {
    const text = textInputRef.current.value;
    if (!text) return;
    try {
      const res = await axios.post(
        `${ServerApi}/message/sent/to/${user._id}`,
        { text },
        { withCredentials: true }
      );
      if (res.status === 200) {
        textInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error.response.message || error.message);
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data) => {
      if (data.senderId === user._id || data.receiverId === user._id) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage");
    };
  }, [socket, user._id]);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="bg-gray-200 p-4 rounded-2xl">
      <div className="w-100 max-h-100">
        <div className="flex justify-between">
          <div className="flex gap-2 ">
            <img
              src={null}
              alt=""
              className="w-12 h-12 overflow-hidden  rounded-full object-cover "
            />
            <h1 className="font-semibold">{"Aabhushan Dhakal"}</h1>
          </div>
          <div className="flex gap-3">
            <Phone />
            <Video />
            <X
              onClick={() => {
                setMiniMessagner((prev) => ({ open: false }));
              }}
            />
          </div>
        </div>
        {/* Chat area */}

        <div
          ref={chatContainerRef}
          className="flex flex-col gap-2 p-3 rounded-2xl overflow-auto h-50 bg-white"
        >
          {messages.map((dd) => (
            <div
              key={dd._id}
              className={`${
                dd.senderId === currentUser.userId
                  ? "self-end bg-blue-400 text-white"
                  : "self-start bg-gray-200 text-gray-800"
              } px-3 py-2 rounded-lg max-w-[70%]`}
            >
              {dd.text}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 p-2 items-center">
          <LucideVoicemail />
          <GalleryHorizontal />
          <input
            type="text"
            ref={textInputRef}
            placeholder="Write message"
            className="bg-blue-400 rounded-2xl p-2"
          />
          <button onClick={handleSentMessage}> Sent</button>
        </div>
      </div>
    </div>
  );
};

export default MiniMessanger;
