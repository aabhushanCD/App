import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/userModel.js";

export const myProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.json(user);
});

export const userProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user)
    return res.status(404).json({
      message: "No user with this Id",
    });
  res.json(user);
});
