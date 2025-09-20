import React, { useRef, useMemo, useState } from "react";
import profile from "../assets/profile.png";
import {
  Camera,
  CircleX,
  Cross,
  CrossIcon,
  Image,
  Music,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CreatePost = () => {
  const fileInputRef = useRef();
  const contentInputRef = useRef();
  const [form, setForm] = useState({
    content: "",
    files: [],
  });
  const [isCreate, setCreate] = useState(false);

  const previews = useMemo(() => {
    return form.files?.map((file) => ({
      type: file.type,
      name: file.name,
      url: URL.createObjectURL(file),
    }));
  }, [form.files]);

  const handleContent = (e) => {
    const content = contentInputRef.current.value;
    setForm((prev) => ({ ...prev, content }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, files: [...prev.files, ...selectedFiles] }));
  };

  const handleButton = () => {
    setCreate(true);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePostSubmit = () => {
    console.log(form);
  };
  const handleFileRemove = (file, idx) => {
    setForm((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== idx),
    }));
  };

  return (
    <>
      <div className="bg-gray-50 w-[520px] border rounded-xl flex gap-4 justify-center m-auto p-5">
        {/* Profile image */}
        <div>
          <img
            src={profile}
            alt="profile"
            className="w-15 h-auto rounded-full"
          />
        </div>

        {/* Post input */}
        <div className="flex-1 rounded-xl border-2 p-2">
          <div
            name="content"
            onClick={handleButton}
            value={form.content}
            placeholder="Write Something..."
            className="w-96 pointer-coarse: resize-none rounded-xl bg-gray-100 text-black !border-none !outline-none focus:!ring-0 focus:!outline-none hover:bg-gray-50 shadow-none"
          >
            Write Something...
          </div>

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
        <div className="relative flex justify-center items-center">
          <div className="absolute flex flex-col justify-between top-3 w-1/2 bg-gray-500 text-black rounded-xl h-[550px] z-10">
            <div>
              <h1 className="text-3xl font-semibold mb-3 text-center p-4 border-b-2">
                Create Post
              </h1>
              <div className="flex items-center gap-2 p-2">
                <img src={profile} alt="" className="w-12 h-12 rounded-full" />
                <span className="font-medium">{"User Name"}</span>
              </div>
              <Textarea
                name="content"
                onChange={handleContent}
                ref={contentInputRef}
                placeholder="Write something ..."
                className="w-full h-[50px] resize-none border-none outline-none 
                          focus:!ring-0 focus:!outline-none shadow-none
                          bg-transparent p-3  placeholder:text-gray-400 !text-3xl"
              />
            </div>
            <div className="overflow-auto p-3 mt-2 max-h-100 break-words bg-gray-500">
              {previews.length > 0 && (
                <div className="grid grid-cols-2  mt-3 gap-1  items-center">
                  {previews.map((file, idx) => {
                    if (file.type.startsWith("image/")) {
                      return (
                        <div className="relative" key={idx}>
                          <CircleX
                            size={30}
                            className="absolute end-0 p-1 hover:bg-red-200 text-red-400 z-10"
                            onClick={() => handleFileRemove(file, idx)}
                          />
                          <img
                            src={file.url}
                            alt={file.name}
                            className=" w-[612px] h-auto object-cover rounded-lg border"
                          />
                        </div>
                      );
                    }
                    if (file.type.startsWith("video/")) {
                      return (
                        <div className="relative" key={idx}>
                          <CircleX
                            size={30}
                            className="absolute end-0 p-1 text-red-400 z-10 hover:bg-red-200"
                            onClick={() => handleFileRemove(file, idx)}
                          />
                          <video
                            src={file.url}
                            className="w-[612px] h-auto object-cover rounded-lg border"
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              )}
            </div>
            <div className=" flex justify-between p-4 items-center  border-t pt-3">
              <Label>Add to Post</Label>

              <input
                name="media"
                ref={fileInputRef}
                onChange={handleFileChange}
                type="file"
                multiple
                hidden
              />

              <div className="flex gap-3 ">
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

                <Button
                  className="bg-blue-400 text-white h-8"
                  onClick={handlePostSubmit}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
