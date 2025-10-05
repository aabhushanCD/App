import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send, Image, CloudCog } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { ServerApi } from "@/constants";
import { toast } from "sonner";

const Comment = ({ postId, comments, setComments, updatePostCommentCount }) => {
  const fileInputRef = useRef();
  const textinputRef = useRef();
  const [comment, setComment] = useState();
  const [commentThreeDot, setCommentThreeDot] = useState(false);
  const handleTextChange = (e) => {
    setComment((prev) => ({ ...prev, text: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setComment((prev) => ({ ...prev, file }));
    }
  };
  const handleSendComment = async () => {
    try {
      const formData = new FormData();
      formData.append("commentText", comment.text);
      if (comment.file) formData.append("file", comment.file);

      console.log(formData);
      const res = await axios.post(
        `${ServerApi}/post/sendComment/${postId}`,
        formData,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("comment Success");
        setComments((prev) => [res.data.newComment, ...(prev || [])]);
        updatePostCommentCount?.(postId, +1);
      }
    } catch (error) {
      toast.error("something went wrong to send comment", error.message);
      console.error(error.message);
    } finally {
      setComment({ text: "", file: null });
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
      toast.error(response.error.message);
    }
  };
  const handleCommentThreeDot = () => {
    setCommentThreeDot((commentThreeDot) => !commentThreeDot);
  };
  const preview = comments?.file ? URL.createObjectURL(comments.file) : null;
  return (
    <div className=" p-4 border-t bg-gray-50 rounded-b-xl ">
      {/* Input Section */}
      <div className=" flex items-center gap-2">
        {/* Comment Input */}
        <div className=" flex flex-1 items-center bg-white border rounded-full  shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
          <Input
            className="flex-1 border-none focus:!outline-none focus:!ring-0 text-sm"
            placeholder={"Write a comment..."}
            ref={textinputRef}
            onChange={handleTextChange}
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
              <div className="relative flex gap-3 items-start ">
                <span className="absolute right-2 cursor-pointer">
                  <button onClick={handleCommentThreeDot}>...</button>
                  {commentThreeDot && (
                    <ul className="absolute right-2 top-5">
                      <li onClick={() => handleDeleteComment(comment._id)}>
                        Delete
                      </li>
                    </ul>
                  )}
                </span>
                <img
                  src={comment.creatorId?.imageUrl}
                  alt="user"
                  className="w-8 h-8 rounded-full"
                />
                <div className="bg-white border px-3 py-2 rounded-lg shadow-sm w-sm">
                  <p className="p-1 text-sm font-medium">
                    {comment.creatorId?.name}
                  </p>
                  <p className="text-sm text-gray-700">{comment.text}</p>
                  <img src={comment.imageUrl} alt="" />
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
