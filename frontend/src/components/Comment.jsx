import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send, Image, Heart, SendIcon } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { ServerApi } from "@/constants";
import { toast } from "sonner";
import { timeAgo } from "@/constants";
const Comment = ({ postId, comments, setComments, updatePostCommentCount }) => {
  const fileInputRef = useRef();
  const textinputRef = useRef();
  const [comment, setComment] = useState({ text: "", file: null });
  const [activeMenu, setActiveMenu] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setComment((prev) => ({ ...prev, file }));
    }
  };
  const handleSendComment = async () => {
    const text = textinputRef.current.value;
    if (!text && !comment.file) {
      toast.error("Cannot send empty comment");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("commentText", text);
      if (comment.file) formData.append("file", comment.file);

      const res = await axios.post(
        `${ServerApi}/post/sendComment/${postId}`,
        formData,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("comment Success");
        setComments((prev) => [res.data.newComment, ...(prev || [])]);
        updatePostCommentCount?.(postId, +1);
        textinputRef.current.value = "";
        setComment({ text: "", file: null });
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong while sending comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `${ServerApi}/post/deleteComment/${postId}/comment/${commentId}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Comment Deleted Successfully");
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
        updatePostCommentCount?.(postId, -1);
      }
    } catch (error) {
      console.error("Something went wrong to delete comment");
      toast.error(error.response?.data?.message || "Failed to delete comment");
    }
  };

  const likeComment = async (commentId) => {
    try {
      const res = await axios.put(
        `${ServerApi}/post/likeComment/${commentId}`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        // Update comment likes locally
        setComments((prev) =>
          prev.map((c) =>
            c._id === commentId ? { ...c, likes: res.data.totalLike } : c
          )
        );
      }
    } catch (error) {
      console.error("Failed to like comment", error);
    }
  };
  const handleEditComment = async (commentId) => {
    if (!editingText.trim()) return toast.error("Comment cannot be empty");
    try {
      const res = await axios.put(
        `${ServerApi}/post/editComment/${commentId}`,
        { commentText: editingText },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setComments((prev) =>
          prev.map((c) =>
            c._id === commentId ? { ...c, text: res.data.comment.text } : c
          )
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

  const toggleMenu = (id) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  const preview = comment?.file ? URL.createObjectURL(comment.file) : null;
  return (
    <div className=" p-4 border-t bg-gray-50 rounded-b-xl ">
      {/* Input Section */}
      <div className=" flex items-center gap-2">
        {/* Comment Input */}
        <div className=" flex flex-1 items-center bg-white border rounded-full  shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
          <Input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSendComment();
              }
            }}
            className="flex-1 border-none focus:!outline-none focus:!ring-0 text-sm"
            placeholder={"Write a comment..."}
            ref={textinputRef}
            // onChange={handleTextChange}
          />
          <Button
            size="icon"
            className=" rounded-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleSendComment}
          >
            <Send size={18} />
          </Button>
        </div>
        {/* Upload Image */}
        <Label htmlFor="image">
          <Image size={18} />
        </Label>
        <input
          id="image"
          type="file"
          size="icon"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
      {preview && (
        <img src={preview} width="150" alt="" className="mt-2 rounded-2xl" />
      )}
      {/* Comment List */}

      {comments?.length > 0 && (
        <div>
          {comments.map((comment) => (
            <div className="mt-4 space-y-3 overflow-auto " key={comment._id}>
              <div className="relative flex   gap-3 items-start ">
                <span className="absolute right-2 cursor-pointer">
                  <button onClick={() => toggleMenu(comment._id)}>...</button>
                  {activeMenu === comment._id && (
                    <ul className="absolute right-2 top-5">
                      <li onClick={() => handleDeleteComment(comment._id)}>
                        Delete
                      </li>
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
                    <p className=" text-sm font-medium">
                      {comment.creatorId?.name}
                    </p>
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
                    <span
                      className="flex"
                      onClick={() => likeComment(comment._id)}
                    >
                      <Heart className="p-1 text-red-400"></Heart>
                      {comment.likes.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
