// src/controllers/authController.js

import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import { error } from "console";
import { uploadOnCloudinary } from "../utils/fileUpload.js";
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, acceptTerms } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !password || !acceptTerms) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Save user to database
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      acceptTerms,
    });
    if (newUser.acceptTerms == false) {
      res.status(400).json({
        message: "You must accept the terms and conditions.",
      });
    }
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error!!",
      error: error.message,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      //validation of email and password in login page
      return res.status(400).json({
        message: "Required Email and Password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: `Something went wrong Failed to Login & Check your Credentials 404 ! `,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: `Invalid email or password.`,
      });
    }
    const accessToken = generateAccessToken(user._id, email);
    const refreshToken = generateRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save({
      validateBeforeSave: false,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 60 * 1000, // 15 min
      httpOnly: true,

      sameSite: "strict",
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
      httpOnly: true,

      sameSite: "strict",
    });
    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred during login.",
      error: error.message,
    });
  }
};

export const LogOut = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ message: "User ID is required to log out." });
    }
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        error: error.message,
      });
    }
    user.refreshToken = "";
    user.save({
      validateBeforeSave: false,
    });
    res.cookie("accessToken", "", {
      httpOnly: true,
      sameSite: "None",
      expires: new Date(0), // Immediately expire the cookie
    });
    res.cookie("refreshToken", "", {
      httpOnly: true,
      sameSite: "None",
      expires: new Date(0),
    });
    return res.status(200).json({ message: "Successfully logged out." });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to log out.",
      error: error.message,
    });
  }
};

export const profilePhotoUpload = async (req, res) => {
  try {
    const { owner, profilePicture } = req.body;
    console.log(owner);
    if (!owner) {
      return res.status(404).json({
        message: "Please login first!",
      });
    }
    let resImage = "";
    if (profilePicture) {
      const cloudinary = await uploadOnCloudinary(profilePicture);
      if (!cloudinary) {
        return res.status(500).json({
          message: "Internal server error failed to upload photo to cloudinary",
        });
      }
      resImage = cloudinary.url;
    } else {
      return res.status(404).json({
        message: "please upload photo",
      });
    }

    const user = await User.findById(owner).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "user not found!",
      });
    }
    user.profilePicture = resImage;
    await user.validateBeforeSave(false).save();

    return res.status(200).json({
      message: "profile Updated",
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    return res.status(500).json({ message: "An unexpected error occurred." });
  }
};

export const coverPhotoUpload = async (req, res) => {
  try {
    const { owner, coverPhoto } = req.body;
    if (!owner) {
      return res.status(404).json({
        message: "Please login first!",
      });
    }
    let coverImage = "";
    if (coverPhoto) {
      const cloudinary = await uploadOnCloudinary(coverPhoto);
      if (!cloudinary) {
        return res.status(500).json({
          message: "Internal server error failed to upload photo to cloudinary",
        });
      }
      coverImage = cloudinary.url;
    } else {
      return res.status(404).json({
        message: "please upload photo",
      });
    }

    const user = await User.findById(owner).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "user not found!",
      });
    }
    user.profilePicture = coverImage;
    await user.validateBeforeSave(false).save();

    return res.status(200).json({
      message: "profile Updated",
      coverPhoto: user.coverPhoto,
    });
  } catch (error) {
    console.error("Error uploading Cover photo:", error);
    return res.status(500).json({ message: "An unexpected error occurred." });
  }
};
