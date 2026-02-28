import React from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../postService";
import { toast } from "sonner";
import { Camera, Image, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const CreatePost = ({
  currentUser,
  setLoading,
  form,
  setPostData,
  setCreate,
  setForm,
  handleButton,
}) => {
  const navigate = useNavigate();
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
    <div
      className={`bg-white border md:rounded-2xl shadow-sm flex gap-3 items-start p-2 md:p-4 ${
        location.pathname === "/newsfeeds" ? "hidden" : ""
      }`}
    >
      {/* Profile image */}
      <img
        src={currentUser.imageUrl}
        alt="profile"
        className="w-12 h-12 rounded-full object-cover border"
        onClick={() => navigate("/profile")}
      />

      {/* Post input + actions */}
      <div className="flex-1">
        <div
          onClick={handleButton}
          className="cursor-pointer rounded-xl bg-gray-100 text-gray-700 px-4 py-2 hover:bg-gray-200 transition"
        >
          {form.content || "What's on your mind?"}
        </div>

        {/* Post actions */}
        <div className={`hidden md:flex justify-between items-center mt-4 `}>
          <div className="flex gap-4 text-gray-500">
            <button
              onClick={() => handleButton()}
              className="flex items-center gap-1 hover:text-green-500 transition"
            >
              <Image size={18} />{" "}
              <span className="hidden sm:inline">Photo</span>
            </button>
            <button
              onClick={() => handleButton()}
              className="flex items-center gap-1 hover:text-red-500 transition"
            >
              <Video size={18} />{" "}
              <span className="hidden sm:inline">Video</span>
            </button>
            <button
              onClick={() => handleButton()}
              className="flex items-center gap-1 hover:text-purple-500 transition"
            >
              <Camera size={18} />{" "}
              <span className="hidden sm:inline">Camera</span>
            </button>
          </div>
          <Button
            onClick={handlePostSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 h-9 rounded-lg shadow-sm"
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
