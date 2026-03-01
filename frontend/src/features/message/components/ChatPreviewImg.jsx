import { X } from "lucide-react";
import React from "react";

const ChatPreviewImg = ({ preview, setPreview, mediaInputRef }) => {
  return (
    <div className="relative p-2 bg-gray-100 border-t">
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
  );
};

export default ChatPreviewImg;
