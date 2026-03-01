import React, { memo, useMemo } from "react";

import { Camera, CircleX, Image, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
// import { useAuth } from "@/store/AuthStore.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/authContext";
import { createPost } from "../postService";
import { toast } from "sonner";

const CreatePost = ({
  loading,
  setForm,
  setLoading,
  form,
  fileInputRef,
  contentInputRef,
  setCreate,
  handleButton,
  setPostData,
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
  const handleContent = () => {
    const content = contentInputRef.current.value;
    setForm((prev) => ({ ...prev, content }));
  };
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

  const handlePostSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("content", form.content);

      form.files.forEach((file) => {
        formData.append("media", file);
      });
      const res = await createPost(formData);
      // res.data;
      if (res.status === 200) {
        setPostData((prev) => ({
          ...prev,
          posts: [res.data.newPost, ...prev.posts],
        }));
        toast.success("Post Successfully", res.message);
        setCreate(false);
        setForm({ content: "", files: [] });
      }
    } catch (error) {
      toast.error(error.response?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {/* Popup modal */}
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/20 ">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-lg">
          <div className="flex justify-center items-center bg-transparent ">
            <div className=" flex flex-col justify-between top-3 w-full bg-linear-to-br from-blue-50 to-green-50 text-black rounded-xl h-[550px] z-10">
              <div>
                <span className=" flex justify-between items-center mb-3 p-4 border-b-2">
                  <span></span>
                  <h1 className="text-center font-semibold text-3xl text-gray-600">
                    Create Post
                  </h1>
                  <span
                    onClick={() => {
                      setCreate(false);
                    }}
                    className="hover:text-blue-600 cursor-pointer "
                  >
                    Close
                  </span>
                </span>

                <div className="flex items-center gap-2 p-2">
                  <img
                    src={currentUser.imageUrl}
                    alt="profile"
                    className="w-12 h-12 object-cover  rounded-full"
                    onClick={() => navigate("/profile")}
                  />
                  <span className="font-medium">{currentUser.name}</span>
                </div>
                <Textarea
                  name="content"
                  onChange={handleContent}
                  ref={contentInputRef}
                  placeholder="Write something . . ."
                  className="w-full max-h-[150px] text-gray-600 resize-none border-none outline-none 
                          focus:!ring-0 focus:!outline-none shadow-none
                          bg-transparent p-3  placeholder:text-gray-400 !text-3xl"
                />
              </div>
              <div className="overflow-auto p-3 mt-2 max-h-100 break-words ">
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

export default memo(CreatePost);
