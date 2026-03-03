import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { addHighlights, getHighlights } from "../profile.service";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      await addHighlights(data);
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
    <>
      {/* HIGHLIGHTS ROW */}
      <div className="flex gap-4 w-100 md:w-full p-4 overflow-x-auto scrollbar-thin">
        {/* ADD HIGHLIGHT */}
        <div
          onClick={handleAddHighlight}
          className="flex flex-col items-center gap-1 cursor-pointer"
        >
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-100 transition">
            <span className="text-2xl text-gray-500">+</span>
          </div>
          <span className="text-xs text-gray-600">New</span>
        </div>

        {/* EXISTING HIGHLIGHTS */}
        {highlights.map((h, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 to-yellow-400">
              <img
                src={h.mediaUrl}
                alt="highlight"
                className="w-full h-full rounded-full object-cover border-2 border-white"
              />
            </div>

            <span className="text-xs text-gray-600 max-w-[80px] text-center truncate">
              {h.memo}
            </span>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {addHighlight.open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-xl flex flex-col max-h-[85vh]">
            {/* HEADER */}
            <div className="flex justify-between items-center px-5 py-4 border-b">
              <h2 className="font-semibold text-gray-800 text-lg">
                Create Highlight
              </h2>

              <X
                className="cursor-pointer text-gray-500 hover:text-red-500"
                onClick={() => {
                  setAddHighlight({ open: false, state: 1 });
                  document.body.style.overflow = "auto";
                }}
              />
            </div>

            {/* STEP 1 MEMO */}
            {addHighlight.state === 1 && (
              <div className="p-6 space-y-4">
                <label className="text-sm font-medium text-gray-700">
                  Highlight Title
                </label>

                <Input
                  maxLength={24}
                  placeholder="Write your memories..."
                  value={highlightMemo}
                  onChange={(e) => setHighlightMemo(e.target.value)}
                />
              </div>
            )}

            {/* STEP 2 MEDIA SELECT */}
            {addHighlight.state === 2 && (
              <div className="p-4 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-3">
                {myPost.map((post) =>
                  post.media?.map((m, i) => (
                    <div
                      key={`${post._id}-${i}`}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border
                      ${
                        selectedPostId === post._id && selectedMediaIndex === i
                          ? "border-blue-500 ring-2 ring-blue-400"
                          : "border-gray-200"
                      }`}
                      onClick={() => handleHighlightChange(post._id, i)}
                    >
                      <img
                        src={m.url}
                        className="w-full h-36 object-cover hover:scale-105 transition"
                      />
                    </div>
                  )),
                )}
              </div>
            )}

            {/* FOOTER BUTTONS */}
            <div className="flex justify-between items-center px-5 py-4 border-t">
              {addHighlight.state === 2 && (
                <Button
                  variant="outline"
                  onClick={() => setAddHighlight({ open: true, state: 1 })}
                >
                  Previous
                </Button>
              )}

              <div className="ml-auto">
                {addHighlight.state === 2 ? (
                  <Button
                    disabled={
                      isLoading ||
                      !selectedPostId ||
                      selectedMediaIndex === null
                    }
                    onClick={() =>
                      handleAddHighlightSubmit(
                        selectedPostId,
                        selectedMediaIndex,
                      )
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Create Highlight
                  </Button>
                ) : (
                  <Button
                    onClick={() => setAddHighlight({ open: true, state: 2 })}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileHighlights;
