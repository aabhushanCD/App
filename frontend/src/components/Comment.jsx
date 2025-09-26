import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send, Image, CloudCog } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { ServerApi } from "@/constants";
import { toast } from "sonner";

const Comment = ({
  postId,
  comments,
  setComments,
  serverComment,
  handleFetchComments,
}) => {
  const fileInputRef = useRef();
  const textinputRef = useRef();

  const handleTextChange = (e) => {
    setComments((prev) => ({ ...prev, text: e.target.value }));
    console.log(comments);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setComments((prev) => ({ ...prev, file }));
    }
  };
  const handleSendComment = async () => {
    try {
      const formData = new FormData();
      formData.append("commentText", comments.text);
      if (comments.file) formData.append("file", comments.file);

      console.log(formData);
      const res = await axios.post(
        `${ServerApi}/post/sendComment/${postId}`,
        formData,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("comment Success");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setComments({ text: "", file: null });
    }
  };

  const preview = comments?.file ? URL.createObjectURL(comments.file) : null;
  return (
    <div className="p-4 border-t bg-gray-50 rounded-b-xl">
      {/* Input Section */}
      <div className="flex items-center gap-2">
        {/* Comment Input */}
        <div className="flex flex-1 items-center bg-white border rounded-full  shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
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
            <div className="mt-4 space-y-3 overflow-auto" key={comment._id}>
              <div className="flex gap-3 items-start">
                <img
                  src={comment.creatorId.imageUrl}
                  alt="user"
                  className="w-8 h-8 rounded-full"
                />
                <div className="bg-white border px-3 py-2 rounded-lg shadow-sm">
                  <p className="text-sm font-medium">
                    {comment.creatorId.name}
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
