import Post from "../model/PostModel/Post.model.js";
import { uploadMedia } from "../util/cloudinary.js";

export const createPost = async (req, res) => {
  try {
    const userId = req.userId;
    const { content } = req.body;
    const files = req.files;
    console.log(files);
    if (!content && (!files || files.length === 0)) {
      return res.status(400).json({ message: "Cannot empty post" });
    }
    let media = [];
    if (files && files.length > 0) {
      const uploadResults = await Promise.all(
        files.map((file) => uploadMedia(file.path))
      );
      media = uploadResults.map((result) => ({
        type: result.resource_type,
        url: result.secure_url,
        publicId: result.public_id,
        thumbnail:
          result.resource_type === "video" ? result.secure_url + ".jpg" : null,
      }));
    }

    const newPost = new Post({
      userId,
      content,
      media,
    });

    await newPost.save();
    return res.status(200).json({ message: "Successfully Posted!", newPost });
  } catch (error) {
    console.log("Something went wrong!", error.message);
    return res.status(500).json({ message: "server problem while posting" });
  }
};
