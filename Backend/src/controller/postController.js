import Post from "../model/PostModel/Post.model.js";
import { deleteMedia, uploadMedia } from "../util/cloudinary.js";

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
      creatorId: userId,
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

export const getPostPagenation = async (req, res) => {
  try {
    const { page = 1, limit = 3 } = req.query;
    const userId = req.userId;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const posts = await Post.find()
      .populate("creatorId", "name imageUrl")
      .populate("media")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Successfully get all posts",
      posts,
      userId,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: " server error, Something Went Wrong! while getting problem ",
    });
  }
};

export const getSearchedPost = async (req, res) => {
  try {
    const { searchPost } = req.body;
    if (!searchPost) {
      return res.status(401).json({ message: "Please enter valid search" });
    }

    const posts = await Post.find(
      {
        $text: { $search: searchPost },
      },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .populate("creatorId", "name imageUrl")
      .populate("media");

    return res.status(200).json({ success: true, count: posts.length, posts });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error while searching posts" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.query;
    const userId = req.userId;

    if (!postId) {
      return res
        .status(400)
        .json({ success: false, message: "Doesn't find post" });
    }
    const postUser = await Post.findById(postId).populate("media");
    if (postUser.creatorId.toString() !== userId) {
      return res.status(403).json({
        message: "You are not authorized to delete this post",
        success: false,
      });
    }
    if (postUser.media && postUser.media.length > 0) {
      await Promise.all(
        postUser.media.map((file) => deleteMedia(file.publicId))
      );
    }

    await Post.deleteOne({ _id: postId });

    return res
      .status(200)
      .json({ success: true, message: "Post Deleted Successfully" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server Error, Failed to delete post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { newContent } = req.body;
    const { postId } = req.query;
    const userId = req.userId;
    if (!postId || !userId) {
      return res.status(400).json({ message: "UnAuthorized to Update Post" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    // ✅ check authorization
    if (post.creatorId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to update this post",
      });
    }
    // ✅ update post content
    post.content = newContent?.trim().length > 0 ? newContent : post.content;
    await post.save();

    return res
      .status(200)
      .json({ success: true, message: "successfully update post", post });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "server error, Could't update post" });
  }
};
