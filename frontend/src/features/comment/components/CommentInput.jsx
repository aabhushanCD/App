import React, { memo, useRef, useState } from "react";
import { sendComment } from "../comment.service";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image, Loader, Send } from "lucide-react";
import { Label } from "@/components/ui/label";

const CommentInput = ({
  setComments,
  setComment,
  comment,
  updatePostCommentCount,
  postId,
}) => {
  const fileInputRef = useRef();
  const textinputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setComment((prev) => ({ ...prev, file }));
    }
  };
  const handleSendComment = async () => {
    setIsLoading(true);
    const text = textinputRef.current.value;
    if (!text && !comment.file) {
      toast.error("Cannot send empty comment");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("commentText", text);
      if (comment.file) formData.append("file", comment.file);

      const res = await sendComment(postId, formData);
      if (res.status === 200) {
        toast.success("comment Success");
        setComments((prev) => [res.data.newComment, ...(prev || [])]);
        updatePostCommentCount?.(postId, +1);
        textinputRef.current.value = "";
        setComment({ text: "", file: null });
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong while sending comment");
    }
  };
  return (
    <div className=" flex items-center gap-2 ">
      {/* Comment Input */}
      <div className=" flex flex-1 items-center bg-white border rounded-full  shadow-sm focus-within:ring-2 focus-within:ring-blue-400 ">
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
        {!isLoading ? (
          <Button
            size="icon"
            className=" rounded-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleSendComment}
          >
            <Send size={18} />
          </Button>
        ) : (
          <Loader />
        )}
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
  );
};

export default memo(CommentInput);
