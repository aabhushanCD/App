import express from "express";
import { createPosts, getPost } from "../controllers/postController.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/", upload.single("file"), createPosts);
router.get("/displayPost", getPost);
export default router;
