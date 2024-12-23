import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",

      index: true, // Index for performance
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
    share: {
      type: String,
    },
    content: {
      type: String,
      maxlength: 500, // Content length limit
    },
    likes: [], // Changed to array of user references
    deleted: {
      type: Boolean,
      default: false, // Soft delete field
    },
  },
  {
    timestamps: true,
  }
);

// Optional: Add virtual for like count

export const Post = mongoose.model("Post", postSchema);
