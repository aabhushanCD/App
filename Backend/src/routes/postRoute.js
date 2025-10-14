import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createPost,
  deleteComment,
  deletePost,
  editComment,
  getAllComments,
  getPostPagenation,
  getSearchedPost,
  getSinglePost,
  getSingleUserAllPost,
  like_dislikePost,
  likeComment,
  sendComment,
  updatePost,
} from "../controller/postController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// post
router.post("/createPost", verifyToken, upload.array("media", 10), createPost);
router.get("/getPostPagenation", verifyToken, getPostPagenation);
router.get("/getSearchedPost", verifyToken, getSearchedPost);
router.delete("/deletePost/:postId", verifyToken, deletePost);
router.put("/updatePost", verifyToken, updatePost);
router.get("/getSinglePost/:postId", getSinglePost);
router.get("/myPost", verifyToken, getSingleUserAllPost);

//___________________ interPost_________________________

router.put("/like_dislikePost/:postId", verifyToken, like_dislikePost);
router.post(
  "/sendComment/:postId",
  verifyToken,
  upload.single("file"),
  sendComment
);
router.get("/getAllComments/:postId", verifyToken, getAllComments);
router.delete(
  "/deleteComment/:postId/comment/:commentId",
  verifyToken,
  deleteComment
);
router.put("/editComment/:commentId", verifyToken, editComment);
router.put("/likeComment/:commentId", verifyToken, likeComment);
export default router;
