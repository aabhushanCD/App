import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServerApi } from "@/constants";
import { useAuth } from "@/store/AuthStore";
import axios from "axios";
import { Bookmark, Grid2x2, Settings, Tags, X } from "lucide-react";
import React, { useEffect,  useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const [myPost, setMypost] = useState([]);
  const { currentUser, setCurrentUser } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    image: null,
  });
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);
  const [highlightMemo, setHighlightMemo] = useState("");
  const [addHighlight, setAddHighlight] = useState({
    open: false,
    state: 1,
  });

  // Fetch user posts
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await axios.get(`${ServerApi}/post/myPost`, {
          withCredentials: true,
        });
        setMypost(res.data.posts);
      } catch (error) {
        console.error(
          error?.response?.data?.message ||
            "Something went wrong while fetching posts"
        );
      }
    };
    fetchMyPosts();
  }, [currentUser]);

  // Handle profile update
  const handleProfileUpdate = async () => {
    try {
      const form = new FormData();
      if (formData.name) form.append("name", formData.name);
      if (formData.bio) form.append("bio", formData.bio);
      if (formData.image) form.append("profile", formData.image);

      const res = await axios.put(`${ServerApi}/auth/updateProfile`, form, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setCurrentUser(res.data.user);
        // Update user in auth store
        setIsEdit((prev) => !prev);
        setFormData({ name: "", bio: "", image: null });
        toast.success("Profile Update Successfully");
      } else {
        console.error(res.data.message);
        toast.error(
          error?.response?.data?.message ||
            "Something error happened while updating profile"
        );
      }
    } catch (error) {
      console.error(
        error.message || "Something went wrong while updating profile"
      );
      toast.error(error.message);
    }
  };
  const handleAddHighlight = () => {
    setAddHighlight((prev) => ({ open: true, state: 1 }));
    document.body.style.overflow = "hidden";
  };
  const handleHighlightChange = (postId, mediaIndex) => {
    setSelectedPostId(postId);
    setSelectedMediaIndex(mediaIndex);
  };

  const handleAddHighlightSubmit = async (postId, mediaIndex) => {
    try {
      if (!highlightMemo) {
        toast.error("Please write a memo");
        return;
      }

      await axios.post(
        `${ServerApi}/highlight/addHighlight`,
        { postId, mediaIndex, memo: highlightMemo, type: "image" },
        { withCredentials: true }
      );

      toast.success("Highlight added successfully!");
      setAddHighlight({ open: false, state: 1 });
      document.body.style.overflow = "auto";
      setHighlightMemo(""); // clear input
      fetchHighlights(); // refresh highlights
    } catch (error) {
      console.error(error);
      toast.error("Failed to add highlight");
    }
  };
  const [highlights, setHighlights] = useState([]);

  const fetchHighlights = async () => {
    try {
      const res = await axios.get(`${ServerApi}/highlight/getHighlights`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setHighlights(res.data.highlights);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch highlights");
    }
  };
  useEffect(() => {
    fetchHighlights();
  }, []);
  return (
    <div className="md:flex md:items-center md:justify-center ">
      <div className="p-2 md:w-[50%]">
        {/* --- Profile Info Section --- */}
        <div className="flex rounded-full gap-4 md:gap-20 items-center">
          {currentUser.imageUrl ? (
            <img
              className="w-25 h-25 md:h-50 md:w-50 rounded-full object-cover"
              src={currentUser.imageUrl}
              alt="profile"
            />
          ) : (
            <span className="w-40 h-40 border-2 rounded-full bg-gray-300" />
          )}

          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <Button onClick={() => setIsEdit(true)}>Edit profile</Button>
              <Button>View archive</Button>
              <Settings />
            </div>
            <div className="flex gap-4 items-center">
              <span>
                <span className="font-bold">{myPost?.length || 0}</span> posts
              </span>
              <span>
                <span className="font-bold">{myPost?.length || 0}</span> Friends
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-lg">
                {currentUser.name || "User"}
              </span>
              <span>{currentUser.bio || "No bio yet."}</span>
              <span className="text-blue-500 cursor-pointer">webLink</span>
            </div>
          </div>
        </div>

        {/* ---Edit Profile--- */}
        {isEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg relative">
              <button
                className="absolute top-3 right-3"
                onClick={() => setIsEdit(false)}
              >
                <X />
              </button>
              <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="border rounded p-2"
                  placeholder={currentUser.name}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <label className="text-sm font-medium">Bio</label>
                <textarea
                  className="border rounded p-2"
                  rows="3"
                  placeholder={currentUser.bio || "Write about yourself..."}
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />

                <label className="text-sm font-medium">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                />

                <Button
                  onClick={handleProfileUpdate}
                  className="mt-4 bg-blue-600 text-white"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* --- Story / Highlights --- */}
        <div
          className={` ${
            addHighlight.open ? "relative" : ""
          } flex flex-row-reverse  gap-4 p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400`}
        >
          <div
            className="flex-shrink-0 w-24 h-24 flex items-center justify-center rounded-full border bg-gray-500 text-white font-bold cursor-pointer"
            onClick={handleAddHighlight}
          >
            <span className="text-2xl">+</span>
          </div>
          {highlights.map((h, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-24 flex flex-col items-center"
            >
              {h.mediaUrl && (
                <img
                  src={h.mediaUrl}
                  alt="highlight"
                  className="w-24 h-24 rounded-full border-4 object-cover"
                />
              )}
              {h.memo && (
                <span className="text-sm text-center mt-1">{h.memo}</span>
              )}
            </div>
          ))}

          {addHighlight.open && (
            <div className="fixed flex flex-col justify-between self-center w-90   z-1 p-2  md:w-[100vh] h-150 top-20 rounded-2xl overflow-hidden bg-orange-300">
              <X
                className="absolute right-2 hover:bg-gray-400 rounded-full"
                onClick={() => {
                  setAddHighlight({ open: false, state: 1 });
                  document.body.style.overflow = "auto";
                }}
              />
              {addHighlight.state === 1 && (
                <div className="">
                  <h1>Write a Memo</h1>
                  <Input
                    type="text"
                    maxLength={24}
                    className="mt-3"
                    placeholder="Write Your Memories Here..."
                    value={highlightMemo}
                    onChange={(e) => setHighlightMemo(e.target.value)}
                  />
                </div>
              )}
              {addHighlight.state === 2 && (
                <div className="grid md:grid-cols-3 gap-2 grid-cols-2 border  overflow-y-auto ">
                  {myPost.map((post) => (
                    <div key={post._id} className="flex">
                      {post.media &&
                        post.media.map((m, i) => (
                          <div className="max-h-75 border">
                            <img
                              src={m.url}
                              key={i}
                              className="h-70 p-2 transition:transform hover:scale-101 duration-300 object-cover"
                              onClick={() => handleHighlightChange(post._id, i)}
                            />
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={() => setAddHighlight({ open: true, state: 1 })}
                >
                  {"<-- Previous"}
                </Button>
                {addHighlight.state === 2 ? (
                  <Button
                    disabled={!selectedPostId || selectedMediaIndex === null}
                    onClick={() =>
                      handleAddHighlightSubmit(
                        selectedPostId,
                        selectedMediaIndex
                      )
                    }
                  >
                    {"Create"}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setAddHighlight({ open: true, state: 2 })}
                  >
                    {"Next -->"}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* --- Tabs Section --- */}
        <div className="flex  bg-gray-400 justify-around p-3 ">
          <Grid2x2 />
          <Bookmark />
          <Tags />
        </div>

        {/* --- My Posts --- */}
        {myPost?.length > 0 && (
          <div className="grid md:grid-cols-3 grid-cols-2 gap-2 p-2">
            {myPost.map((post) => (
              <div
                key={post._id}
                className="relative aspect-square bg-gray-200 overflow-hidden rounded-md cursor-pointer group"
              >
                {post?.media?.length > 0 ? (
                  <>
                    {post.media[0].type === "image" ? (
                      <img
                        src={post.media[0].url}
                        alt="post"
                        className="w-full h-full object-cover group-hover:opacity-90 transition"
                      />
                    ) : (
                      <video
                        src={post.media[0].url}
                        className="w-full h-full object-cover group-hover:opacity-90 transition"
                        controls
                      />
                    )}

                    {/* Show overlay if multiple media */}
                    {post.media.length > 1 && (
                      <div className="absolute top-[50%] right-[50%] bg-black/60 text-white text-lg px-2 py-1 rounded-md">
                        +{post.media.length - 1}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No Media
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
