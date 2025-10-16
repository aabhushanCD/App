import React, { useRef, useMemo, useState, useEffect } from "react";
import { ServerApi } from "../constants.js";
import profile from "../assets/profile.png";
import { Camera, CircleX, Image, Music, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/store/AuthStore.jsx";
import { useNavigate } from "react-router-dom";

const CreatePost = ({
  loading,
  setForm,
  form,
  fileInputRef,
  contentInputRef,
  setCreate,
  handleContent,
  handleButton,
  handlePostSubmit,
}) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  // const [isCreate, setCreate] = useState(false);

  const previews = useMemo(() => {
    return form.files?.map((file) => ({
      type: file.type,
      name: file.name,
      url: URL.createObjectURL(file),
    }));
  }, [form.files]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, files: [...prev.files, ...selectedFiles] }));
  };

  const handleFileRemove = (file, idx) => {
    setForm((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== idx),
    }));
  };

  return (
    <>
      {/* Popup modal */}
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-lg">
          <div className="flex justify-center items-center bg-transparent ">
            <div className=" flex flex-col justify-between top-3 w-full bg-gray-500 text-black rounded-xl h-[550px] z-10">
              <div>
                <span className=" flex justify-between items-center mb-3 p-4 border-b-2">
                  <span></span>
                  <h1 className="text-center font-semibold text-3xl">
                    Create Post
                  </h1>
                  <span
                    onClick={() => {
                      setCreate(false);
                    }}
                    className="hover:text-red-200 cursor-pointer "
                  >
                    Close
                  </span>
                </span>

                <div className="flex items-center gap-2 p-2">
                  <img
                    src={currentUser.imageUrl}
                    alt="profile"
                    className="w-12 h-12 rounded-full"
                    onClick={() => navigate("/profile")}
                  />
                  <span className="font-medium">{currentUser.name}</span>
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
                {previews?.length > 0 && (
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
                  <button onClick={() => handleButton("image")}>
                    <Image size={18} />
                  </button>
                  <button onClick={() => handleButton("video")}>
                    <Video size={18} />
                  </button>
                  <button onClick={() => handleButton("camera")}>
                    <Camera size={18} />
                  </button>

                  {!loading && (
                    <Button
                      className="bg-blue-400 text-white h-8"
                      onClick={handlePostSubmit}
                    >
                      Post
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
