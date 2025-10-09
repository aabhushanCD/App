import { io } from "../../socketIo.js";
import { Messenger } from "../model/messanger.model.js";
import User from "../model/User.model.js";
import { deleteMedia, uploadMedia } from "../util/cloudinary.js";
export const sendMessage = async (req, res) => {
  try {
    const userId = req.userId;
    const { receiverId } = req.params;
    const { text } = req.body;
    const file = req.file;
    const filePath = file?.path;
    if (!userId) {
      return res.status(403).json({ success: false, message: "UnAuthorized" });
    }
    if (!receiverId) {
      return res
        .status(401)
        .json({ success: false, message: "User is not Available" });
    }
    if (!text && !file) {
      return res
        .status(400)
        .json({ success: false, message: "Couldn't send empty message" });
    }

    let media = null;
    if (filePath) {
      const mediaUrl = await uploadMedia(filePath);

      if (!mediaUrl) {
        console.error("Cloudinary error", error.message);
        return res.status(500).json({ message: "Cloudinary problem:" });
      }
      media = mediaUrl;
    }

    const newMessage = await Messenger.create({
      senderId: userId,
      receiverId,
      text,
      media,
    });

    io.to(receiverId.toString()).emit("newMessage", newMessage);
    io.to(userId).emit("newMessage", newMessage);
    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    console.error("Something went wrong!", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server Error to send message" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const userId = req.userId;

    if (!receiverId || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Something went wrong!, Try Again!" });
    }
    // Find all messages between the two users
    const messages = await Messenger.find({
      $or: [
        { senderId: userId, receiverId: receiverId },
        { senderId: receiverId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });
    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("❌ Something went Wrong in getMessage", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching messages",
    });
  }
};

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
// export const deleteMessages = async (req, res) => {
//   try {
//     const userId = req.userId;
//     if (!userId) {
//       return res.status(400).json({ message: "UnAuthorized please login" });
//     }
//     await Messenger.find({ senderId: userId });
//   } catch (error) {}
// };
