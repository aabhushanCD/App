import React, { memo, useState } from "react";
import CommentInput from "./components/CommentInput";
import CommentListData from "./components/CommentListData";
const Comment = ({ postId, comments, setComments, updatePostCommentCount }) => {
  const [comment, setComment] = useState({ text: "", file: null });

  const preview = comment?.file ? URL.createObjectURL(comment.file) : null;
  return (
    <div className=" p-4 border-t bg-gray-50 rounded-b-xl  min-h-60">
      {/* Input Section */}
      <CommentInput
        setComments={setComments}
        setComment={setComment}
        comment={comment}
        updatePostCommentCount={updatePostCommentCount}
        postId={postId}
      />
      {preview && (
        <img src={preview} width="150" alt="" className="mt-2 rounded-2xl" />
      )}
      {/* Comment List */}

      {comments?.length > 0 && (
        <div className="">
          {comments.map((comment) => (
            <CommentListData
              key={comment._id}
              comment={comment}
              setComments={setComments}
              postId={postId}
              updatePostCommentCount={updatePostCommentCount}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(Comment);
