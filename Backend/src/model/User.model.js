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
        post: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
          required: true,
        },
        meidaIndex: {
          type: Number,
          default: 0,
          required: true,
        },
        type: { type: String, enum: ["image", "video"], default: "image" },
        memo: {
          type: String,
          maxLength: 24,
          trim: true,
        },
      },
    ],
    preferences: {},
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
