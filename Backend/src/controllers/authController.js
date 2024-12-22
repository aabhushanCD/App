// src/controllers/authController.js

import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
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
    generateToken(newUser._id, res);
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
      return res.json({
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }
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
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
