import React, { useState } from "react";
import profile from "../assets/profile.png";
import { Camera, Image, Music, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CreatePost = () => {
  const [form, setForm] = useState({ content: "", file: {} });
  const [isCreate, setCreate] = useState(false);

  const handleContent = (e) => {
    setCreate(true);
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleButton = (type) => {
    console.log("Clicked:", type);
  };

  return (
    <>
      <div className="relative bg-gray-50 w-[520px] border rounded-xl flex gap-4 justify-center m-auto p-5">
        {/* Profile image */}
        <div>
          <img
            src={profile}
            alt="profile"
            className="w-15 h-auto rounded-full"
          />
        </div>

        {/* Post input */}
        <div className="flex-1 rounded-xl p-2">
          <Textarea
            name="content"
            onChange={handleContent}
            placeholder="Write Something..."
            className="w-96 resize-none rounded-xl !border-none !outline-none focus:!ring-0 focus:!outline-none shadow-none"
          />

          <div className="flex gap-3 justify-end items-center mt-2">
            <button onClick={() => handleButton("music")}>
              <Music size={18} />
            </button>
            <button onClick={() => handleButton("image")}>
              <Image size={18} />
            </button>
            <button onClick={() => handleButton("video")}>
              <Video size={18} />
            </button>
            <button onClick={() => handleButton("camera")}>
              <Camera size={18} />
            </button>
            <Button className="bg-blue-400 text-white h-8">Post</Button>
          </div>
        </div>

        {/* Popup modal */}
      </div>
      {isCreate && (
        <div className="absolute top-0 w-full h-full bg-black/60 flex justify-center items-center">
          <div className="bg-white text-black rounded-xl p-4 w-[400px]">
            <h1 className="text-lg font-semibold mb-3">Create Post</h1>
            <div className="flex items-center gap-2">
              <img src={profile} alt="" className="w-12 h-12 rounded-full" />
              <span className="font-medium">{"User Name"}</span>
            </div>

            <div className="w-full mt-4 max-h-100 overflow-y-auto break-words">
              <p>{form.content}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
