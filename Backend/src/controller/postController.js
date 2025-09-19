import Post from "../model/PostModel/Post.model.js";
import { uploadMedia } from "../util/cloudinary.js";
export const createPost = async (req, res) => {
  try {
    const userId = req.userId;
    const { content } = req.body;
    const filePath = req.file?.path;
    console.log(filePath);
    if (!content && !filePath) {
      return res.status(400).json({ message: "Cannot empty post" });
    }

    const cloudinaryUrl = await uploadMedia(filePath);
    if (!cloudinaryUrl) {
      return res
        .status(500)
        .json({ message: "server error cloudinary create post" });
    }
    const newPost = new Post({
      content,
      imageUrl: cloudinaryUrl,
      videoUrl: cloudinaryUrl,
    });
    await newPost.save();
    return res.status(200).json({ message: "Successfully Posted!", newPost });
  } catch (error) {
    console.log("Something went wrong!", error.message);
    return res.status(500).json({ message: "server problem while posting" });
  }
};
