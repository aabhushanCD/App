import { Post } from "../models/postModel.js";

export const createPosts = async (req, res) => {
  try {
    const {
      owner,
      image,
      video = null,
      share = null,
      content,
      likes = [],
      deleted = false,
    } = req.body;

    if (!owner) {
      return res.status(400).json({
        message: "how can you upload data I'm shocked",
      });
    }
    const newPost = new Post({
      owner,
      image,
      video,
      share,
      content,
      likes,
      deleted,
    });
    await newPost.save();
    res.status(201).json({
      message: "Your post had uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error had occured while posting!!!!!!!!!",
      error: error.message,
    });
  }
};
