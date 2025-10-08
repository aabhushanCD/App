import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["liked", "shared", "comment", "newPost"],
      required: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // who triggered the notification
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // who will receive the notification
    },

    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // optional, if notification is related to a post
      default: null,
    },

    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // optional, for comment-related notifications
      default: null,
    },

    message: {
      type: String,
      trim: true, // optional: store a ready-to-display message
    },

    isRead: {
      type: Boolean,
      default: false, // to track unread notifications
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
