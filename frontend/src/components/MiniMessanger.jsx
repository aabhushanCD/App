import { ServerApi } from "@/constants";
import { useAuth } from "@/store/AuthStore";
import { useNotify } from "@/store/NotificationStore";
import axios from "axios";
import {
  BookImage,
  GalleryHorizontal,
  LucideVoicemail,
  Phone,
  Video,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import AudioVideo from "./Audio_Video";

const MiniMessanger = ({ setMiniMessagner, user }) => {
  const { currentUser } = useAuth();
  const socket = useNotify();
  const [messages, setMessages] = useState([]);
  const textInputRef = useRef();
  const mediaInputRef = useRef();
  const chatContainerRef = useRef();
  const [preview, setPreview] = useState(null);
  const [videoCall, setVideoCall] = useState(false);
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(`${ServerApi}/message/${user._id}`, {
        withCredentials: true,
      });
      setMessages(res.data.messages);
    };
    fetchMessages();
  }, [user]);

  const handleMedia = () => {
    if (!mediaInputRef.current.value) {
      mediaInputRef.current.click();
    }
  };

  const handleFileChange = () => {
    const file = mediaInputRef.current.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };
  const handleSentMessage = async () => {
    let formData = new FormData();
    const text = textInputRef.current.value;
    const file = mediaInputRef.current.files[0];
    if (file || text) {
      formData.append("text", text);
      formData.append("media", file);
    } else return toast.error("Cannot Empty Message");
    try {
      const res = await axios.post(
        `${ServerApi}/message/sent/to/${user._id}`,
        formData,
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
    textInputRef.current.focus();
  }, [handleSentMessage]);

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
    <div className="flex flex-col  h-full max-h-screen">
      <div className="  flex flex-col bg-gray-200 rounded-2xl h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b border-gray-300 bg-blue-500 rounded-t-2xl">
          <div className="flex gap-2 items-center">
            {user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt=""
                className="w-12 h-12 rounded-full object-cover "
              />
            ) : (
              <span className="w-12 h-12 rounded-3xl  border-2 flex items-center justify-center text-gray-100">
                {"U"}
              </span>
            )}
            <h1 className="font-semibold">{user.name || "User"}</h1>
          </div>
          <div className="flex gap-3 ">
            <Phone className="cursor-pointer" />
            <Video
              className="cursor-pointer"
              onClick={() => setVideoCall((prev) => !prev)}
            />
            <X
              className="cursor-pointer"
              onClick={() => {
                setMiniMessagner((prev) => ({ open: false }));
              }}
            />
          </div>
        </div>
        {/* Chat area */}

        <div
          ref={chatContainerRef}
          className="flex flex-col flex-1 bg-white p-3 space-y-2 overflow-y-auto"
        >
          {messages.map((dd) => (
            <div
              key={dd._id}
              className={`${
                dd.senderId === currentUser.userId
                  ? "self-end bg-blue-400 text-white "
                  : "self-start bg-gray-200 text-gray-800"
              } relative px-3 py-2 rounded-lg max-w-[80%]  `}
            >
              {dd.media && (
                <img
                  src={dd.media}
                  alt="media"
                  className="w-40 rounded-md mb-1"
                />
              )}
              {dd.text}
            </div>
          ))}
        </div>
        {preview && (
          <div className="relative p-2 bg-gray-100">
            <img src={preview} alt="" className="w-24 rounded-md" />
            <X
              size={20}
              className="absolute top-0 left-20 cursor-pointer text-white hover:text-red-500"
              onClick={() =>
                setPreview(() => (mediaInputRef.current.value = null))
              }
            />
          </div>
        )}
        <div className="sticky bottom-0 bg-white border-t border-gray-300 flex items-center gap-2 p-2">
          <LucideVoicemail />
          <GalleryHorizontal
            className="cursor-pointer text-gray-600"
            onClick={handleMedia}
          />
          <input
            type="text"
            ref={textInputRef}
            placeholder="Write message..."
            className="flex-1 p-2 bg-gray-100 rounded-2xl focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSentMessage();
              }
            }}
          />
          <input
            type="file"
            ref={mediaInputRef}
            onChange={handleFileChange}
            hidden
          />

          <button
            className="bg-blue-500 text-white px-4 py-1 rounded-2xl"
            onClick={handleSentMessage}
          >
            Sent
          </button>
        </div>
        {videoCall && (
          <div className="absolute w-full h-full top-20">
            <AudioVideo remoteUserId={user._id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniMessanger;
