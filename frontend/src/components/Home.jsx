import React, { useEffect, useRef, useState } from "react";
import CreatePost from "./CreatePost";
import { ServerApi } from "../constants.js";
import PostContainer from "./PostContainer";
import axios from "axios";
import { Camera, Image, Music, Video } from "lucide-react";
import profile from "../assets/profile.png";
import { Button } from "./ui/button";
import { toast } from "sonner";
import LeftSideBar from "./LeftSideBar";
import Navbar from "./Navbar";

const Home = () => {
  const [postsData, setPostData] = useState({});
  const [form, setForm] = useState({
    content: "",
    files: [],
  });
  const [isCreate, setCreate] = useState(false);
  const fileInputRef = useRef();
  const contentInputRef = useRef();
  const handlePostSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("content", form.content);

      form.files.forEach((file) => {
        formData.append("media", file);
      });
      const res = await axios.post(`${ServerApi}/post/createPost`, formData, {
        withCredentials: true,
      });
      // res.data;
      if (res.status === 200) {
        console.log(res.data.newPost);
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
    }
  };
  const handleContent = (e) => {
    const content = contentInputRef.current.value;
    setForm((prev) => ({ ...prev, content }));
  };

  const limit = 3;
  const page = 1;
  useEffect(() => {
    const postFetch = async () => {
      try {
        const res = await axios.get(
          `${ServerApi}/post/getPostPagenation?limit=${limit}&page=${page}`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setPostData(res.data);
          // console.log(res.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };
    postFetch();
  }, []);
  const handleButton = () => {
    setCreate(true);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  useEffect(() => {
    if (isCreate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isCreate]);
return (
  <>
    <Navbar />
    <div className="flex w-full gap-6 p-4 max-w-7xl mx-auto">
      {/* Sidebar */}
      <LeftSideBar />

      {/* Main Feed */}
      <div className="flex-1 max-w-2xl w-full space-y-6">
        {/* Create Post Section */}
        <div className="bg-white border rounded-2xl shadow-sm flex gap-3 items-start p-4">
          {/* Profile image */}
          <img
            src={profile}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover border"
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
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-4 text-gray-500">
                <button
                  onClick={() => handleButton("music")}
                  className="flex items-center gap-1 hover:text-blue-500 transition"
                >
                  <Music size={18} />{" "}
                  <span className="hidden sm:inline">Music</span>
                </button>
                <button
                  onClick={() => handleButton("image")}
                  className="flex items-center gap-1 hover:text-green-500 transition"
                >
                  <Image size={18} />{" "}
                  <span className="hidden sm:inline">Photo</span>
                </button>
                <button
                  onClick={() => handleButton("video")}
                  className="flex items-center gap-1 hover:text-red-500 transition"
                >
                  <Video size={18} />{" "}
                  <span className="hidden sm:inline">Video</span>
                </button>
                <button
                  onClick={() => handleButton("camera")}
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

        {/* Create modal */}
        {isCreate && (
          <CreatePost
            setForm={setForm}
            form={form}
            fileInputRef={fileInputRef}
            contentInputRef={contentInputRef}
            setCreate={setCreate}
            handleContent={handleContent}
            handleButton={handleButton}
            handlePostSubmit={handlePostSubmit}
          />
        )}

        {/* Posts */}
        <div className="space-y-6">
          <PostContainer postsData={postsData} setPostData={setPostData} />
        </div>
      </div>

      {/* Right Sidebar (Optional for balance) */}
      <div className="hidden lg:block w-64">
        <div className="bg-white rounded-2xl border shadow-sm p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Trending</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>#ReactJS</li>
            <li>#TailwindCSS</li>
            <li>#WebDev</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);



};

export default Home;
