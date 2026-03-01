import AudioVideo from "@/components/Audio_Video";

import { useNotify } from "@/features/notification/NotificationStore";

import { Phone, Video, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { useAuth } from "@/features/auth/authContext";
import { getMessage } from "./message.service";
import ChatChats from "./components/ChatChats";
import ChatInputs from "./components/ChatInputs";
import ChatPreviewImg from "./components/ChatPreviewImg";
import ChatHead from "./components/ChatHead";

const ChatBox = ({ user, setMiniChat }) => {
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
        const res = await getMessage(user._id);
        setMessages(res.data.messages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, [user]);

  // Send message

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
    <div className="flex flex-col h-screen max-h-screen w-full bg-white  overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b  bg-blue-500  text-white">
        <ChatHead user={user} />
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
            onClick={() => setMiniChat({ open: false })}
          />
        </div>
      </div>

      {/* Chat area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-3 py-4 space-y-3   "
      >
        {messages.length == 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-5 shadow-inner">
              💬
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Start Your Conversation
            </h2>

            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              This is the beginning of your private chat with{" "}
              <span className="font-medium text-gray-700">
                {user?.name || "your friend"}
              </span>
              . Send a message to break the ice and start connecting instantly.
            </p>
          </div>
        )}
        {messages.map((dd) => (
          <ChatChats dd={dd} currentUser={currentUser} />
        ))}
      </div>

      {/* Media preview */}
      {preview && (
        <ChatPreviewImg
          preview={preview}
          setPreview={setPreview}
          mediaInputRef={mediaInputRef}
        />
      )}

      {/* Input area */}

      <ChatInputs
        mediaInputRef={mediaInputRef}
        setPreview={setPreview}
        textInputRef={textInputRef}
        chatContainerRef={chatContainerRef}
        user={user}
      />
      {/* Video call (no gray background) */}
      {videoCall && (
        <div className="absolute inset-0 z-50 bg-white">
          <AudioVideo remoteUserId={user._id} setVideoCall={setVideoCall} />
        </div>
      )}
    </div>
  );
};

export default ChatBox;
