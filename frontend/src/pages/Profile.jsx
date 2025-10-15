import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServerApi } from "@/constants";
import { useAuth } from "@/store/AuthStore";
import axios from "axios";
import { Bookmark, Grid2x2, Settings, Tags, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const [myPost, setMypost] = useState([]);
  const { currentUser, setCurrentUser } = useAuth(); // Make sure AuthStore allows updating user
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
        setTotalFriend(res.data.totalFriend); // Update user in auth store
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
    <div className="flex justify-center mt-5">
      <div>
        {/* --- Profile Info Section --- */}
        <div className="flex gap-10 items-center">
          {currentUser.imageUrl ? (
            <img
              className="w-40 h-40 rounded-full object-cover"
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
          } flex gap-4 overflow-auto p-4 `}
        >
          <div className="flex gap-4 overflow-auto p-4">
            {highlights.map((h, i) => (
              <div key={i} className="flex flex-col items-center">
                {h.mediaUrl && (
                  <img
                    src={h.mediaUrl}
                    alt="highlight"
                    className="w-30 h-30 rounded-full border-4 object-cover"
                  />
                )}
                {h.memo && (
                  <span className="text-sm text-center mt-1">{h.memo}</span>
                )}
              </div>
            ))}
          </div>

          <div
            className="flex justify-center p-4  w-30 h-30 rounded-full border-4 text-6xl text-white cursor-pointer bg-gray-400"
            onClick={handleAddHighlight}
          >
            <p>+</p>
          </div>
          {addHighlight.open && (
            <div className="fixed flex flex-col justify-between self-center  p-2 w-200 h-150 top-20 rounded-2xl overflow-hidden bg-orange-300">
              <X
                className="absolute right-2 hover:bg-gray-400 rounded-full"
                onClick={() => {
                  setAddHighlight({ open: false, state: 1 });
                  document.body.style.overflow = "auto";
                }}
              />
              {addHighlight.state === 1 && (
                <div>
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
                <div className=" flex  flex-wrap gap-2 border  h-full overflow-auto w-full">
                  {myPost.map((post) => (
                    <div key={post._id}>
                      {post.media &&
                        post.media.map((m, i) => (
                          <img
                            src={m.url}
                            key={i}
                            className="w-50 border p-2 transition:transform hover:scale-101 duration-300 "
                            onClick={() => handleHighlightChange(post._id, i)}
                          />
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
        <div className="flex justify-around border bg-gray-500 text-2xl rounded p-2 items-center">
          <Grid2x2 />
          <Bookmark />
          <Tags />
        </div>

        {/* --- My Posts --- */}
        {myPost?.length > 0 && (
          <div className="border w-[101vh] flex flex-wrap">
            {myPost.map((post) => (
              <div key={post._id} className="w-[50vh] h-[50vh]">
                {post?.media?.map((m, index) => (
                  <div
                    key={index}
                    className="w-full h-full flex justify-center items-center"
                  >
                    {m.type === "image" && (
                      <img
                        src={m.url}
                        alt="post"
                        className="w-full h-full object-cover rounded"
                      />
                    )}
                    {m.type === "video" && (
                      <video
                        controls
                        className="w-full h-full object-cover rounded"
                      >
                        <source src={m.url} type="video/mp4" />
                      </video>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
