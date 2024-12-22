import express from "express";
import {createPosts} from "../controllers/postController.js";

const router = express.Router();

router.post("/", createPosts);

export default router;
