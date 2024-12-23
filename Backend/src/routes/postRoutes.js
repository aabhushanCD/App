import express from "express";
import { createPosts } from "../controllers/postController.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/", upload.single("file"), createPosts);
export default router;
