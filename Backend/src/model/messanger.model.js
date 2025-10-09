import mongoose from "mongoose";

const MessengerSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      trim: true,
    },
    media: {
      type: String, // could be image/video/file URL
    },
  },
  { timestamps: true }
);

export const Messenger = mongoose.model("Messenger", MessengerSchema);
