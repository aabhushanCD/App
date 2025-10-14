import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
    },
    imageUrl: {
      type: String,
    },
    address: {
      type: String,
    },
    bio: {
      type: String,
      default: "This is your bio",
      maxlength: 50,
      trim: true,
    },
    highlight: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        text: "",
      },
    ],
    preferences: {},
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
