import { ServerApi } from "@/constants";
import { useAuth } from "@/store/AuthStore";
import { useNotify } from "@/store/NotificationStore";
import axios from "axios";
import {
  LucideVoicemail,
  GalleryHorizontal,
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

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${ServerApi}/message/${user._id}`, {
          withCredentials: true,
        });
        setMessages(res.data.messages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, [user]);

  // Media file select
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

  // Send message
  const handleSentMessage = async () => {
    let formData = new FormData();
    const text = textInputRef.current.value;
    const file = mediaInputRef.current.files[0];
    if (file || text) {
      formData.append("text", text);
      formData.append("media", file);
    } else return toast.error("Cannot send empty message");

    try {
      const res = await axios.post(
        `${ServerApi}/message/sent/to/${user._id}`,
        formData,
        { withCredentials: true }
      );
      if (res.status === 200) {
        textInputRef.current.value = "";
        mediaInputRef.current.value = null;
        setPreview(null);
      }
    } catch (error) {
      console.error(error.response?.message || error.message);
    }
  };

  // Auto focus input
  useEffect(() => {
    textInputRef.current?.focus();
  }, []);

  // Socket listener
  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (data) => {
      if (data.senderId === user._id || data.receiverId === user._id) {
        setMessages((prev) => [...prev, data]);
      }
    };
    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage");
  }, [socket, user._id]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-6 w-[340px] md:w-[380px] h-[500px] flex flex-col overflow-hidden z-50 bg-white shadow-xl rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-gray-300 bg-blue-500 text-white rounded-t-2xl">
        <div className="flex gap-2 items-center">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt=""
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <span className="w-9 h-9 rounded-full border flex items-center justify-center text-white bg-blue-400">
              U
            </span>
          )}
          <h1 className="font-semibold text-sm">{user.name || "User"}</h1>
        </div>
        <div className="flex gap-3">
          <Phone size={18} className="cursor-pointer" />
          <Video
            size={18}
            className="cursor-pointer"
            onClick={() => setVideoCall((prev) => !prev)}
          />
          <X
            size={18}
            className="cursor-pointer"
            onClick={() => setMiniMessagner(() => ({ open: false }))}
          />
        </div>
      </div>

      {/* Chat area */}
      <div
        ref={chatContainerRef}
        className="flex flex-col flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-white"
      >
        {messages.map((dd) => (
          <div
            key={dd._id}
            className={`${
              dd.senderId === currentUser.userId
                ? "self-end bg-blue-500 text-white ml-auto"
                : "self-start bg-gray-200 text-gray-800 mr-auto"
            } px-3 py-2 rounded-2xl max-w-[80%] break-words shadow-sm text-sm`}
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
        ))}
      </div>

      {/* Media preview */}
      {preview && (
        <div className="relative p-2 bg-gray-100 border-t border-gray-300">
          <img src={preview} alt="" className="w-24 rounded-md" />
          <X
            size={18}
            className="absolute top-1 left-24 cursor-pointer text-gray-600 hover:text-red-500"
            onClick={() => {
              setPreview(null);
              mediaInputRef.current.value = null;
            }}
          />
        </div>
      )}

      {/* Input area */}
      <div className="bg-white border-t border-gray-300 flex items-center gap-1 p-2">
        <GalleryHorizontal
          className="cursor-pointer text-gray-600 shrink-0"
          onClick={handleMedia}
        />
        <input
          type="text"
          ref={textInputRef}
          placeholder="Write a message..."
          className="flex-1 p-2 bg-gray-100 rounded-2xl text-sm focus:outline-none"
          onFocus={() => {
            setTimeout(() => {
              chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
            }, 200);
          }}
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
          className="bg-blue-500 text-white px-4 py-1 rounded-2xl shrink-0 text-sm"
          onClick={handleSentMessage}
        >
          Send
        </button>
      </div>

      {/* Video call (no gray background) */}
      {videoCall && (
        <div className="absolute w-full h-full top-0 z-50 bg-white rounded-t-2xl">
          <AudioVideo remoteUserId={user._id} />
        </div>
      )}
    </div>
  );
};

export default MiniMessanger;
