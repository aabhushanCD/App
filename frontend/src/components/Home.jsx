import React, { useEffect, useRef, useState } from "react";
import CreatePost from "../features/post/components/CreatePost";

import PostContainer from "../features/post/PostContainer";

import PostCreateSmall from "../features/post/components/PostCreateSmall";

import LeftSideBar from "./LeftSideBar";

import { useAuth } from "@/features/auth/authContext";
import RightSideBar from "./RightSideBar";

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

  const handleContent = () => {
    const content = contentInputRef.current.value;
    setForm((prev) => ({ ...prev, content }));
  };

  const handleButton = () => {
    setCreate(true);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
          <PostCreateSmall
            currentUser={currentUser}
            setLoading={setLoading}
            form={form}
            setPostData={setPostData}
            setCreate={setCreate}
            setForm={setForm}
            handleButton={handleButton}
          />

          {/* Create modal */}
          {isCreate && (
            <CreatePost
              setForm={setForm}
              loading={loading}
              setLoading={setLoading}
              form={form}
              setPostData={setPostData}
              fileInputRef={fileInputRef}
              contentInputRef={contentInputRef}
              setCreate={setCreate}
              handleContent={handleContent}
              handleButton={handleButton}
            />
          )}

          {/* Posts */}
          <div className="space-y-6">
            <PostContainer
              postsData={postsData}
              setPostData={setPostData}
              setLoading={setLoading}
              setHasMore={setHasMore}
              page={page}
            />
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
        <RightSideBar />
      </div>
    </>
  );
};

export default Home;
