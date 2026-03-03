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
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Create Post</h2>

        <button
          onClick={() => setCreate(false)}
          className="text-gray-500 hover:text-red-500 transition"
        >
          Close
        </button>
      </div>

      {/* USER INFO */}
      <div className="flex items-center gap-3 px-6 py-4">
        <img
          src={currentUser.imageUrl}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 cursor-pointer"
          onClick={() => navigate("/profile")}
        />
        <span className="font-medium text-gray-700">{currentUser.name}</span>
      </div>

      {/* TEXTAREA */}
      <div className="px-6">
        <Textarea
          name="content"
          ref={contentInputRef}
          onChange={handleContent}
          placeholder={`What's on your mind, ${currentUser.name}?`}
          className="w-full min-h-[120px] resize-none border-none focus:ring-0 text-lg text-gray-700 placeholder:text-gray-400"
        />
      </div>

      {/* MEDIA PREVIEW */}
      <div className="px-6 overflow-y-auto max-h-[300px]">
        {previews?.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {previews.map((file, idx) => {
              if (file.type.startsWith("image/")) {
                return (
                  <div key={idx} className="relative group">
                    <CircleX
                      size={22}
                      className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-1 cursor-pointer shadow hover:bg-red-100"
                      onClick={() => handleFileRemove(file, idx)}
                    />

                    <img
                      src={file.url}
                      alt={file.name}
                      className="rounded-xl w-full object-cover max-h-[250px]"
                    />
                  </div>
                );
              }

              if (file.type.startsWith("video/")) {
                return (
                  <div key={idx} className="relative">
                    <CircleX
                      size={22}
                      className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-1 cursor-pointer shadow hover:bg-red-100"
                      onClick={() => handleFileRemove(file, idx)}
                    />

                    <video
                      src={file.url}
                      className="rounded-xl w-full max-h-[250px] object-cover"
                      controls
                    />
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>

      {/* ACTION BAR */}
      <div className="border-t mt-4 px-6 py-4 flex items-center justify-between">
        <span className="text-sm text-gray-600 font-medium">
          Add to your post
        </span>

        <input
          name="media"
          ref={fileInputRef}
          onChange={handleFileChange}
          type="file"
          multiple
          hidden
        />

        <div className="flex items-center gap-4">
          <button
            onClick={() => handleButton("image")}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Image className="text-green-500" size={20} />
          </button>

          <button
            onClick={() => handleButton("video")}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Video className="text-blue-500" size={20} />
          </button>

          <button
            onClick={() => handleButton("camera")}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Camera className="text-purple-500" size={20} />
          </button>

          {!loading && (
            <Button
              onClick={handlePostSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5"
            >
              Post
            </Button>
          )}
        </div>
      </div>
    </div>
  </div>
);
};

export default memo(CreatePost);
