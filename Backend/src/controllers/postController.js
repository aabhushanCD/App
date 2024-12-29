import { Post } from "../models/postModel.js";
import User from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/fileUpload.js";
export const createPosts = async (req, res, next) => {
  try {
    const { owner, image, video = null, content } = req.body;

    if (!owner) {
      return res.status(400).json({
        message: "how can you upload data I'm shocked",
      });
    }
    const existedUserPost = await User.findById(owner);
    if (!existedUserPost) {
      return res.status(400).json({
        message: "User don't Exist",
      });
    }
    let imageUrl = null;

    if (req.file) {
      const cloudinaryResult = await uploadOnCloudinary(req.file.path);

      if (!cloudinaryResult) {
        return res.status(500).json({
          message: "Failed to upload file to Cloudinary.",
        });
      }
      imageUrl = cloudinaryResult.url;
    }
     else {
      // If no file is uploaded, handle the case accordingly
      return res.status(400).json({
        message: "Please upload an image or video for the post.",
      });
    }
    const newPost = new Post({
      owner,
      image: imageUrl,
      video,
      content,
    });

    await newPost.save();

    res.status(201).json({
      message: "Your post had uploaded successfully",
    });
    next();
  } catch (error) {
    res.status(500).json({
      message: "Error had occured while posting!",
      error: error.message,
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("owner", "firstName lastName");
    const details = posts.map((post) => ({
      ...post.toObject(),
      Name: `${post.owner.firstName} ${post.owner.lastName}`,
    }));
    res.status(200).json({
      details,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error cannot get Post",
    });
  }
};
