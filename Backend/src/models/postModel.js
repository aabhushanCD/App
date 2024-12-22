import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Index for performance
    },
    image: {
      type: String,
      validate: {
        validator: (v) => /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(v),
        message: "Invalid image URL",
      },
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
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ], // Changed to array of user references
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
postSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

export const Post = mongoose.model("Post", postSchema);
