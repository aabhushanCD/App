import express from "express";
import { sendMessage, getMessages } from "../controller/messangerController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import upload from "../middleware/multer.js";
import { getUsers } from "../controller/authController.js";

const router = express.Router();

router.get("/:receiverId", verifyToken, getMessages);
router.post(
  "/sent/to/:receiverId",
  verifyToken,
  upload.single("media"),
  sendMessage
);
router.get("/all/user", verifyToken, getUsers);
export default router;
