import React, { memo, useState } from "react";
import { deleteComment, editComment, likeComments } from "../comment.service";
import { toast } from "sonner";
import { timeAgo } from "@/utils/constants";
import { Heart, SendIcon } from "lucide-react";

const CommentListData = ({
  comment,
  setComments,
  postId,
  updatePostCommentCount,
}) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await deleteComment(postId, commentId);
      if (res.status === 200) {
        toast.success("Comment Deleted Successfully");
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId),
        );
        updatePostCommentCount?.(postId, -1);
      }
    } catch (error) {
      console.error("Something went wrong to delete comment");
      toast.error(error.response?.data?.message || "Failed to delete comment");
    }
  };

  const toggleMenu = (id) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  const handleEditComment = async (commentId) => {
    if (!editingText.trim()) return toast.error("Comment cannot be empty");
    try {
      const res = await editComment(editingText, commentId);
      if (res.status === 200) {
        setComments((prev) =>
          prev.map((c) =>
            c._id === commentId ? { ...c, text: res.data.comment.text } : c,
          ),
        );
        setEditingCommentId(null);
        setEditingText("");
        toast.success("Comment updated!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to edit comment");
    }
  };

  const likeComment = async (commentId) => {
    try {
      const res = await likeComments(commentId);
      if (res.status === 200) {
        // Update comment likes locally
        setComments((prev) =>
          prev.map((c) =>
            c._id === commentId ? { ...c, likes: res.data.totalLike } : c,
          ),
        );
      }
    } catch (error) {
      console.error("Failed to like comment", error);
    }
  };

  return (
    <div key={comment._id} className="mt-4 space-y-3 overflow-auto ">
      <div className="relative flex   gap-3 items-start ">
        <span className="absolute right-2 cursor-pointer">
          <button onClick={() => toggleMenu(comment._id)}>...</button>
          {activeMenu === comment._id && (
            <ul className="absolute right-2 top-5">
              <li onClick={() => handleDeleteComment(comment._id)}>Delete</li>
              <li
                onClick={() => {
                  setEditingCommentId(comment._id);
                  setEditingText(comment.text);
                  toggleMenu(comment._id);
                }}
              >
                Edit
              </li>
            </ul>
          )}
        </span>
        <img
          src={comment.creatorId?.imageUrl}
          alt="user"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-col   ">
          <div className=" border  rounded-2xl p-2">
            <p className=" text-sm font-medium">{comment.creatorId?.name}</p>
            {editingCommentId === comment._id ? (
              <div className="md:flex gap-2 mt-1">
                <input
                  className="border p-1 rounded "
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <SendIcon
                  onClick={() => handleEditComment(comment._id)}
                  className="mt-2 "
                >
                  Save
                </SendIcon>
              </div>
            ) : (
              <p className="text-sm text-gray-700">{comment.text}</p>
            )}
            {comment.imageUrl && (
              <img
                src={comment.imageUrl}
                className="object-cover w-40 h-40"
                alt=""
              />
            )}
          </div>
          <div className=" flex gap-3">
            <span>{timeAgo(comment.createdAt)}</span>
            <span className="flex" onClick={() => likeComment(comment._id)}>
              <Heart className="p-1 text-red-400"></Heart>
              {comment.likes.length || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CommentListData);
