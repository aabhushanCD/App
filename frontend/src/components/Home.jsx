import React, { useCallback, useEffect, useRef, useState } from "react";
import CreatePost from "../features/post/components/CreatePostCart";
import PostContainer from "../features/post/PostContainer";
import PostCreateSmall from "../features/post/components/PostSmallCreate";

import { useAuth } from "@/features/auth/authContext";
import { getPostPagenation } from "@/features/post/postService";

import PostSkeleton from "./Skeletons/PostSkeleton";

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
  const [loading, setLoading] = useState(false);
  const [isCreate, setCreate] = useState(false);

  const observerRef = useRef(null);
  const fileInputRef = useRef();
  const contentInputRef = useRef();

  const handleButton = useCallback(() => {
    setCreate(true);
    fileInputRef.current?.click();
  }, []);

  /* Infinite Scroll Observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && postsData.hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 },
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [postsData.hasMore, loading]);

  /* Fetch Posts */
  useEffect(() => {
    const postFetch = async () => {
      try {
        setLoading(true);

        const res = await getPostPagenation(page);

        if (res.status === 200) {
          setPostData((prev) => ({
            ...prev,
            posts: [...prev.posts, ...res.data.posts],
            hasMore: res.data.hasMore,
            totalPosts: res.data.totalPosts,
            userId: res.data.userId,
          }));
        }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      } finally {
        setLoading(false);
      }
    };

    postFetch();
  }, [page]);

  return (
    <div className="flex-1 w-full max-w-2xl mx-auto space-y-4">
      {/* Create Post */}
      <PostCreateSmall
        currentUser={currentUser}
        setLoading={setLoading}
        form={form}
        setPostData={setPostData}
        setCreate={setCreate}
        setForm={setForm}
        handleButton={handleButton}
      />

      {/* Create Post Modal */}
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
          handleButton={handleButton}
        />
      )}

      {/* Feed */}
      <div className="space-y-6">
        <PostContainer
          postsData={postsData}
          setPostData={setPostData}
          setLoading={setLoading}
        />

        {/* Skeleton Loader */}
        {loading && (
          <>
            <PostSkeleton />
            <PostSkeleton />
          </>
        )}

        {/* Infinite Scroll Trigger */}
        <div
          ref={observerRef}
          className="h-16 flex items-center justify-center"
        >
          {!postsData.hasMore && (
            <p className="text-gray-400 text-sm">You've reached the end</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
