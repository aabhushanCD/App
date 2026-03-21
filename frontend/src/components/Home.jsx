import React, { useCallback, useEffect, useRef, useState } from "react";
import CreatePost from "../features/post/components/CreatePostCart";
import PostContainer from "../features/post/PostContainer";
import PostCreateSmall from "../features/post/components/PostSmallCreate";
import LeftSideBar from "./LeftSideBar";
import { useAuth } from "@/features/auth/authContext";
import RightSideBar from "./RightSideBar";
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
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  const [isCreate, setCreate] = useState(false);
  const fileInputRef = useRef();
  const contentInputRef = useRef();

  const handleButton = useCallback(() => {
    setCreate(true);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 },
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore]);

  useEffect(() => {
    const postFetch = async () => {
      try {
        setLoading(true);
        const res = await getPostPagenation(page);
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

  return (
    <>
      {/* Main Feed */}
      <div className=" flex-1 max-w-2xl w-full md:space-y-2 justify-self-center">
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
          />
          {loading && <PostSkeleton />}
          <div
            ref={observerRef}
            className="h-12 flex justify-center items-center"
          >
            {!hasMore && (
              <p className="text-gray-400 text-sm">You’ve reached the end</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
