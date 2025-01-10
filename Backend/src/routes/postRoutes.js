import express from "express";
import {
  createPosts,
  getPost,
  deletePost,
} from "../controllers/postController.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();
router.post("/", upload.single("file"), createPosts);
router.get("/displayPost/:page/:limit", getPost);
router.delete("/deletePost", deletePost);
export default router;
