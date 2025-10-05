import Post from "../model/PostModel/Post.model.js";
import { deleteMedia, uploadMedia } from "../util/cloudinary.js";
import User from "../model/User.model.js";
import Comment from "../model/PostModel/Comment.model.js";
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
      .populate("creatorId", "imageUrl name ")
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
    const { postId } = req.params;
    const userId = req.userId;

    if (!postId) {
      return res
        .status(400)
        .json({ success: false, message: "Doesn't find post" });
    }
    const postUser = await Post.findById(postId)
      .populate("media")
      .populate("comments");
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
    // Delete all related comments
    if (postUser.comments && postUser.comments.length > 0) {
      await Comment.deleteMany({ _id: { $in: postUser.comments } });
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
    const { postId } = req.params;
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
    // check authorization
    if (post.creatorId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to update this post",
      });
    }
    //  update post content
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

export const getSinglePost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res
        .status(400)
        .json({ message: "something please provide valid data" });
    }
    const post = await Post.findById(postId).populate(
      "creatorId",
      "name imageUrl"
    );
    return res.status(200).json({
      post,
    });
  } catch (error) {
    console.error("something went wrong servererror in getsingle post");
    return res
      .status(500)
      .json({ message: "Something went wrong on shared post" });
  }
};
// __________________InterPost_______________________
export const like_dislikePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const userId = req.userId;
    if (!postId || !userId) {
      return res
        .status(403)
        .json({ success: false, message: "UnAuthorized to like" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(400)
        .json({ success: false, message: "Post not found!" });
    }
    const user = await User.findById(userId);
    const alreadyLiked = post.likes.some((id) => id.toString() === userId);
    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else post.likes.push(userId);

    await post.save();
    return res.status(200).json({
      success: true,
      message: alreadyLiked ? "Post unLiked" : "Post Liked",
      likes: post.likes,
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "server error, failed to liked post" });
  }
};

export const sendComment = async (req, res) => {
  try {
    const { commentText } = req.body;
    const file = req.file;
    const { postId } = req.params;
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (!postId) {
      return res
        .status(400)
        .json({ success: false, message: "Post ID required" });
    }
    if (!commentText && !file) {
      return res
        .status(400)
        .json({ success: false, message: "Comment text or image required" });
    }

    let imageUrl = null;
    if (file) {
      const cloudinary = await uploadMedia(file.path);
      imageUrl = cloudinary.secure_url;
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const newComment = await Comment.create({
      creatorId: userId,
      postId,
      text: commentText,
      imageUrl,
    });
    post.comments.push(newComment._id);
    await post.save();
    const savedComment = await Comment.findById(newComment._id).populate(
      "creatorId",
      "name imageUrl"
    );

    return res.status(200).json({
      message: "Successfully commented",
      success: true,
      newComment: savedComment,
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "server error, failed to comment" });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    if (!postId || !userId) {
      return res.status(400).json({ success: false, message: "UnAuthorized" });
    }

    const post = await Post.findById(postId).populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "creatorId",
        select: "name imageUrl",
      },
    });

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post doesn't exist" });
    }

    return res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      comments: post.comments,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "server error, Could't get comments try again!",
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId, postId } = req.params;
    const userId = req.userId;
    if (!commentId || !userId || !postId) {
      return res
        .status(400)
        .json({ success: false, message: "UnAuthorized delete comment" });
    }
    const post = await Post.findById(postId).populate("comments");
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    if (
      comment.creatorId.toString() !== userId &&
      post.creatorId.toString() !== userId
    ) {
      return res.status(403).json({ success: false, message: "UnAuthorized" });
    }

    if (comment.imageUrl?.publicId) {
      await deleteMedia(comment.imageUrl.publicId);
    }

    await Comment.findByIdAndDelete(commentId);

    post.comments = post.comments.filter(
      (c) => c && c._id.toString() !== commentId
    );

    await post.save();
    return res
      .status(200)
      .json({ success: true, message: "Successfully Deleted Comment" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error, " });
  }
};

export const editComment = async (req, res) => {
  try {
    const userId = req.userId;
    const { commentId } = req.params;
    const { commentText } = req.body;
    if (!commentId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Comment not found or user Doesn't exist",
      });
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(400)
        .json({ success: false, message: "Comment doesn't exist" });
    }

    if (comment.creatorId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    comment.text = commentText || comment.text;

    await comment.save();
    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "server error, editComment error" });
  }
};

export const likeComment = async (req, res) => {
  try {
    const userId = req.userId;
    const { commentId } = req.params;
    if (!userId || !commentId) {
      return res
        .status(400)
        .json({ success: false, message: "user or comment not valid" });
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.json({ success: false, message: "Comment doesn't exist" });
    }
    const existingLikeIndex = comment.likes.findIndex(
      (user) => user._id.toString() === userId
    );

    if (existingLikeIndex !== -1) {
      // user already liked now remove
      comment.likes.splice(existingLikeIndex, 1);
    } else {
      comment.likes.push({ _id: userId });
    }

    await comment.save();

    return res.status(200).json({
      success: false,
      message: existingLikeIndex !== -1 ? "Liked removed" : "Like added",
      totalLike: comment.likes.length,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "server error, something went wrong while like comments",
    });
  }
};
