import User from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { deleteMedia, uploadMedia } from "../util/cloudinary.js";
import Friend from "../model/Friend.model.js";
import Post from "../model/PostModel/Post.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
// signUp
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
// Login
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
      secure: process.env.NODE_ENV === "production",
      // secure: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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
// Logout
export const LogOut = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exist" });
    }
    res.cookie("accessToken", "", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
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

// update user Profile
export const profileUpdate = async (req, res) => {
  try {
    const userId = req.userId;
    const file = req.file?.path;
    const { bio, name } = req.body;

    if (!userId) {
      return res.status(404).json({ message: "UnAuthorized", success: false });
    }
    if (!file && !bio && !name) {
      return res
        .status(400)
        .json({ success: false, message: "Nothing changed" });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (file) {
      const cloudinaryResult = await uploadMedia(file);
      if (!cloudinaryResult || !cloudinaryResult.secure_url) {
        return res
          .status(500)
          .json({ success: false, message: "Image upload failed" });
      }
      user.imageUrl = cloudinaryResult.secure_url;
    }

    if (bio) user.bio = bio.trim();
    if (name) user.name = name.trim();

    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
      success: true,
      message: "Profile Update Successfully",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        imageUrl: user.imageUrl,
        address: user.address,
        preferences: user.preferences,
        bio: user.bio,
      },
    });
  } catch (error) {
    console.log("Something went wrong", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error while updating profile" });
  }
};

// Check auth
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
        bio: user.bio,
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

// get all Users
export const getUsers = async (req, res) => {
  try {
    const userId = req.userId;
    const users = await User.find({
      _id: { $ne: userId },
    }).select("-password");
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Something went wrong!", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server Error! to get users" });
  }
};

// Add or update Highlights
export const addHighlight = async (req, res) => {
  try {
    const { postId, mediaIndex, memo, type } = req.body;
    const userId = req.userId;

    if (!userId)
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized user" });
    if (!postId || mediaIndex == null || !memo || !type)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // Push new highlight
    user.highlight.push({ post: postId, mediaIndex, memo, type });
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Highlight added successfully" });
  } catch (error) {
    console.error("Error adding highlight:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while adding highlight" });
  }
};

// get own highlights
export const getHighlights = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId)
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized user" });

    const user = await User.findById(userId).populate("highlight.post");

    if (!user || !user.highlight.length) {
      return res
        .status(404)
        .json({ success: false, message: "No highlights found" });
    }

    const highlights = user.highlight.map((h) => {
      const post = h.post;
      const media = post?.media[h.meidaIndex];

      return {
        postId: post?._id,
        caption: post?.content || "",
        mediaUrl: media?.url || null, // get URL from post.media array
        memo: h.memo,
        type: media?.type || h.type,
      };
    });

    return res.status(200).json({ success: true, highlights });
  } catch (error) {
    console.error("Error fetching highlights:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching highlights",
    });
  }
};

// pass Id and get profile
export const getUserProfile = async (req, res) => {
  try {
    const { Id } = req.params;

    // 🔍 Validate ID early
    if (!Id) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // ⚡ Fetch posts & creator info in one go (no second user query)
    const posts = await Post.find({ creatorId: Id })
      .populate({
        path: "creatorId",
        select:
          "name imageUrl email bio highlight.post highlight.meidaIndex highlight.memo highlight.type",
        populate: {
          path: "highlight.post",
          select: "media content", // load only what's needed
        },
      })
      .lean(); // ✅ lean() improves performance (plain JS objects)

    // 🧠 If user has no posts, still fetch minimal user info for profile display
    if (!posts || posts.length === 0) {
      const user = await User.findById(Id)
        .select(
          "name imageUrl email bio highlight.post highlight.meidaIndex highlight.memo highlight.type",
        )
        .populate({
          path: "highlight.post",
          select: "media content",
        })
        .lean();

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Still count friends
      const friend = await Friend.findOne({ userId: Id }).select("allFriends");
      const totalFriends = friend?.allFriends?.length || 0;

      const highlights = (user.highlight || []).map((h) => {
        const post = h.post;
        const media = post?.media?.[h.meidaIndex];
        return {
          postId: post?._id || null,
          caption: post?.content || "",
          mediaUrl: media?.url || null,
          memo: h.memo || "",
          type: media?.type || h.type || "image",
        };
      });

      return res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name || "",
          email: user.email || "",
          imageUrl: user.imageUrl || "",
          bio: user.bio || "",
          totalFriends,
        },
        posts: [],
        highlights,
      });
    }

    // ✅ If posts exist, extract user info from the first post
    const user = posts[0].creatorId;

    // 🧩 Count friends (only once)
    const friend = await Friend.findOne({ userId: Id }).select("allFriends");
    const totalFriends = friend?.allFriends?.length || 0;

    // 🎨 Extract highlights cleanly
    const highlights = (user.highlight || []).map((h) => {
      const post = h.post;
      const media = post?.media?.[h.meidaIndex];
      return {
        postId: post?._id || null,
        caption: post?.content || "",
        mediaUrl: media?.url || null,
        memo: h.memo || "",
        type: media?.type || h.type || "image",
      };
    });

    // 🚀 Send response
    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        bio: user.bio,
        totalFriends,
      },
      posts,
      highlights,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching profile",
    });
  }
};

// send mail for forget password link sends

export const sendPassResetMail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Provide a valid Mail", success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Wrap in an async IIFE so we can use await.

    const info = await transporter.sendMail({
      from: '"Hell`O", <Hell`O.California@gmail.com>',
      to: user.email,
      subject: "Forget Password",
      text: `Click To Change Password`, // plain‑text body
      html: `<a href='${process.env.CLIENT_URL_1}/reset/${user._id}/${token}'>Click Here</b>`, // HTML body
    });
    console.log("Message sent:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    return res
      .status(200)
      .json({ message: "Successfully Send Reset Link", success: true });
  } catch (error) {
    console.error("Server Error While Sending Reset Link", error.message);
    return res.status(500).json({
      message: "Server Error While Sending Reset Link",
      success: false,
    });
  }
};

export const resetPass = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { newPass } = req.body;

    let decode;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Invalid or expired token", success: false });
    }
    // Check if token matches the same user
    if (decode.userId !== id) {
      return res
        .status(403)
        .json({ message: "UnAuthorized request", success: false });
    }
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const hashedPass = await bcrypt.hash(newPass, 10);

    user.password = hashedPass;
    user.validateBeforeSave = false;

    await user.save();

    return res.status(200).json({
      message: "Password reset successful. You can now log in.",
      success: true,
    });
  } catch (error) {
    console.error("Something went wrong!", error.message);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
// export const myAllDetilsforProfile = async (req, res) => {
//   try {
//     const userId = req.userId;

//     if (!userId) {
//       return res.status(404).json({ success: false, message: "UnAuthorized" });
//     }

//     const fiends = await Friend.findOne({ userId });
//   } catch (error) {}
// };
