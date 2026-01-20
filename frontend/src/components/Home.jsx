import React, { useEffect, useRef, useState } from "react";
import CreatePost from "./CreatePost";
import { ServerApi } from "../constants.js";
import PostContainer from "./PostContainer";
import axios from "axios";
import { Camera, Image, Video } from "lucide-react";

import { Button } from "./ui/button";
import { toast } from "sonner";
import LeftSideBar from "./LeftSideBar";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const { currentUser } = useAuth();

  const [postsData, setPostData] = useState({
    posts: [],
    hasMore: true,
    totalPosts: 0,
    userId: null,
  });
  const [form, setForm] = useState({
    content: "",
    files: [],
  });

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  const [isCreate, setCreate] = useState(false);
  const fileInputRef = useRef();
  const contentInputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const handlePostSubmit = async () => {
    try {
      setLoading(true);
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
  const handleContent = () => {
    const content = contentInputRef.current.value;
    setForm((prev) => ({ ...prev, content }));
  };

  useEffect(() => {
    const postFetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${ServerApi}/post/getPostPagenation?limit=${3}&page=${page}`,
          {
            withCredentials: true,
          },
        );
        if (res.status === 200) {
          setPostData((prev) => ({
            ...prev,
            posts: [...(prev.posts || []), ...res.data.posts],
            hasMore: res.data.hasMore,
            totalPosts: res.data.totalPosts,
            userId: res.data.userId,
          }));

          setHasMore(res.data.hasMore);
        }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      } finally {
        setLoading(false);
      }
    };
    postFetch();
  }, [page]);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 },
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {  
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore, loading]);
  return (
    <>
      <div className="flex  w-full gap-0 md:gap-5  max-w-7xl mx-auto dark:bg-black dark:text-white ">
        {/* Sidebar */}
        <div className="hidden md:block sticky top-15 w-[21%] h-[100vh]">
          <LeftSideBar />
        </div>
        {/* Main Feed */}
        <div className=" flex-1 max-w-2xl w-full md:space-y-2">
          {/* Create Post Section */}
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
              <div
                className={`hidden md:flex justify-between items-center mt-4 `}
              >
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

          {/* Create modal */}
          {isCreate && (
            <CreatePost
              setForm={setForm}
              loading={loading}
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

            <div
              ref={observerRef}
              className="h-12 flex justify-center items-center"
            >
              {loading && (
                <p className="text-gray-500 text-sm animate-pulse">
                  Loading more posts...
                </p>
              )}
              {!hasMore && (
                <p className="text-gray-400 text-sm">You’ve reached the end</p>
              )}
            </div>
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
