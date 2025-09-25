import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send, Image } from "lucide-react";
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
  useEffect(() => {
    handleFetchComments();
  }, []);
  const preview = comments.file ? URL.createObjectURL(comments.file) : null;
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

      {/* Comment List */}

      {serverComment && (
        <div className="mt-4 space-y-3 overflow-auto">
          <div className="flex gap-3 items-start">
            <img
              src="https://via.placeholder.com/32"
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            <div className="bg-white border px-3 py-2 rounded-lg shadow-sm">
              <p className="text-sm font-medium">{"John Doe"}</p>
              <p className="text-sm text-gray-700">
                {"This is a sample comment ✨"}
              </p>
              <img src={preview} alt="" />
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <img
              src="https://via.placeholder.com/32"
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            <div className="bg-white border px-3 py-2 rounded-lg shadow-sm">
              <p className="text-sm font-medium">Jane Smith</p>
              <p className="text-sm text-gray-700">Looks great! 🔥</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
