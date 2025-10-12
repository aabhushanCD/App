import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // each user has only one Friend document
  },
  receivedRequest: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  sentRequest: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  allFriends: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  blockedFriend: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Friend = mongoose.model("Friend", friendSchema);

export default Friend;
