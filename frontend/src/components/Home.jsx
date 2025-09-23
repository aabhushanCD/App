import React, { useEffect, useRef, useState } from "react";
import CreatePost from "./CreatePost";
import { ServerApi } from "../constants.js";
import PostContainer from "./PostContainer";
import axios from "axios";
import { Camera, Image, Music, Video } from "lucide-react";
import profile from "../assets/profile.png";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";

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
    <div className="flex flex-col items-center bg-black min-h-screen">
      <div className="w-full max-w-2xl px-2 sm:px-4 lg:px-0">
        {/* Create Post Section */}
        <div className="bg-gray-50 border rounded-xl flex gap-3 items-start p-4">
          {/* Profile image */}
          <img
            src={profile}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover"
          />

          {/* Post input */}
          <div className="flex-1">
            <div
              onClick={handleButton}
              className="cursor-pointer rounded-lg bg-gray-100 text-black px-3 py-2 hover:bg-gray-200"
            >
              {form.content || "Write Something..."}
            </div>

            {/* Post actions */}
            <div className="flex gap-3 flex-wrap justify-between items-center mt-3">
              <div className="flex gap-3">
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
              </div>
              <Button className="bg-blue-500 text-white px-4 h-9 rounded-lg">
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
        <div className="mt-6">
          <PostContainer postsData={postsData} setPostData={setPostData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
