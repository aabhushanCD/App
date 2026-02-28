import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { getHighlights } from "../profile.service";

const ProfileHighlights = ({ myPost }) => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);
  const [highlightMemo, setHighlightMemo] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [addHighlight, setAddHighlight] = useState({
    open: false,
    state: 1,
  });
  const handleAddHighlight = () => {
    setAddHighlight(() => ({ open: true, state: 1 }));
    document.body.style.overflow = "hidden";
  };
  const handleHighlightChange = (postId, mediaIndex) => {
    setSelectedPostId(postId);
    setSelectedMediaIndex(mediaIndex);
  };

  const handleAddHighlightSubmit = async (postId, mediaIndex) => {
    setLoading(true);
    try {
      if (!highlightMemo) {
        toast.error("Please write a memo");
        return;
      }
      const data = {
        postId,
        mediaIndex,
        memo: highlightMemo,
        type: "image",
      };
      await addHighlight(data);
      toast.success("Highlight added successfully!");
      setAddHighlight({ open: false, state: 1 });
      document.body.style.overflow = "auto";
      setLoading(false);
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
      const res = await getHighlights();
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
        <div key={i} className="flex-shrink-0 w-24 flex flex-col items-center">
          {h.mediaUrl && (
            <img
              src={h.mediaUrl}
              alt="highlight"
              className="w-24 h-24 rounded-full border-4 object-cover"
            />
          )}
          {h.memo && <span className="text-sm text-center mt-1">{h.memo}</span>}
        </div>
      ))}

      {addHighlight.open && (
        <div className="fixed flex flex-col justify-between self-center w-90   z-1 p-2  md:w-[100vh] h-140 top-20 rounded-2xl overflow-hidden bg-orange-300">
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
            <Button onClick={() => setAddHighlight({ open: true, state: 1 })}>
              {"<-- Previous"}
            </Button>
            {addHighlight.state === 2 ? (
              <Button
                disabled={
                  isLoading || !selectedPostId || selectedMediaIndex === null
                }
                onClick={() =>
                  handleAddHighlightSubmit(selectedPostId, selectedMediaIndex)
                }
              >
                {"Create"}
              </Button>
            ) : (
              <Button onClick={() => setAddHighlight({ open: true, state: 2 })}>
                {"Next -->"}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHighlights;
