import User from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { deleteMedia, uploadMedia } from "../util/cloudinary.js";
export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide All Fields" });
    }
    const existed = await User.findOne({ email });
    if (existed) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Existed" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be greater than 8" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPass,
    });
    await Friend.create({ userId: user._id });

    return res
      .status(201)
      .json({ success: true, message: "Successfully Created Account" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong couldn't  | serverside Error",
    });
  }
};
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Required All Fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Try Again!" });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: "Successfully login!",
      user: {
        userId: user._id,
        email: user.email,
        name: user.name,
        imageUrl: user.imageUrl,
        phoneNumber: user.phoneNumber,
        address: user.address,
        preferences: user.preferences,
      },
    });
  } catch (error) {
    console.log("Login error", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error login" });
  }
};
export const LogOut = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exist" });
    }
    res.cookie("accessToken", "", {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 0,
    });
    return res
      .status(200)
      .json({ success: true, message: "Logout Successfully!" });
  } catch (error) {
    console.log("Something went wrong", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error logout" });
  }
};

export const profileUpdate = async (req, res) => {
  try {
    const userId = req.userId;
    const file = req.file?.path;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "error! select a image" });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cloudinaryResult = await uploadMedia(file);
    if (!cloudinaryResult || !cloudinaryResult.secure_url) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to upload image, retry!" });
    }

    user.imageUrl = cloudinaryResult.secure_url;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
      success: true,
      message: "Successfully uploaded profile picture",
      user: {
        name: user.name,
        userId: user._id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        imageUrl: user.imageUrl,
        address: user.address,
        preferences: user.preferences,
      },
    });
  } catch (error) {
    console.log("Something went wrong", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error while updating profile" });
  }
};

export const authUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user: {
        name: user.name,
        userId: user._id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        imageUrl: user.imageUrl,
        address: user.address,
        preferences: user.preferences,
      },
      message: "Authorized User",
    });
  } catch (error) {
    console.error("AuthUser error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
