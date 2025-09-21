import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["image", "video", "audio"],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
});

const postSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
    media: [mediaSchema],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);
postSchema.index({ content: "text" });
const Post = mongoose.model("Post", postSchema);

export default Post;
