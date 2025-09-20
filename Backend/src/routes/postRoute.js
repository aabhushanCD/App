import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createPost } from "../controller/postController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/createPost", verifyToken, upload.array("media", 10), createPost);

export default router;
