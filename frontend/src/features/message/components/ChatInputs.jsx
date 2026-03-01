import { GalleryHorizontal } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { messageSentTo } from "../message.service";

const ChatInputs = ({
  mediaInputRef,
  setPreview,
  textInputRef,
  chatContainerRef,
  user,
}) => {
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

  const handleSentMessage = async () => {
    let formData = new FormData();
    const text = textInputRef.current.value;
    const file = mediaInputRef.current.files[0];
    if (file || text) {
      formData.append("text", text);
      formData.append("media", file);
    } else return toast.error("Cannot send empty message");

    try {
      const res = await messageSentTo(user._id, formData);
      if (res.status === 200) {
        textInputRef.current.value = "";
        mediaInputRef.current.value = null;
        setPreview(null);
      }
    } catch (error) {
      console.error(error.response?.message || error.message);
    }
  };
  return (
    <div className=" border-t  flex items-center gap-1 p-2 ">
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
  );
};

export default ChatInputs;
