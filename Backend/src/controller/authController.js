import User from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
      return res.status(400).json({ message: "Please Provide All Fields" });
    }
    const existed = await User.findOne({ email });
    if (existed) {
      return res.status(400).json({ message: "User Already Existed" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be greater than 8" });
    }
    const pass = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: pass,
    });
    await user.save();
    return res.status(200).json({ message: "Successfully Created Account" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong couldn't  | serverside Error" });
  }
};
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Required All Fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "reentered your password" });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Successfully login!",
      user: {
        userId: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log("Login error", error.message);
    return res.status(500).json({ message: "Internal server error login" });
  }
};
export const LogOut = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    res.cookie("accessToken", "", {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 0,
    });
    return res.status(200).json({ message: "Logout Successfully!" });
  } catch (error) {
    console.log("Something went wrong", error.message);
    return res.status(500).json({ message: "Internal server error logout" });
  }
};

export const profileUpdate = async (req, res) => {
  try {
    const userId = req.userId;
    const file = req.file?.path;

    if (!file) {
      return res.status(400).json({ message: "error! select a image" });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cloudinaryResult = await uploadMedia(file);
    if (!cloudinaryResult || !cloudinaryResult.secure_url) {
      return res
        .status(500)
        .json({ message: "Failed to upload image, retry!" });
    }

    user.imageUrl = cloudinaryResult.secure_url;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
      message: "Successfully uploaded profile picture",
      imageUrl: user.imageUrl,
    });
  } catch (error) {
    console.log("Something went wrong", error.message);
    return res
      .status(500)
      .json({ message: "Server error while updating profile" });
  }
};

export const authUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("AuthUser error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
