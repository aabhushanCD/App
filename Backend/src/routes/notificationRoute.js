import express from "express";
import {
  getNotifications,
  markAsRead,
  deleteNotification,
  clearAllNotifications,
} from "../controller/notificationController.js";
import { verifyToken } from "../middleware/verifyToken.js";
// your JWT middleware

const router = express.Router();

router.get("/", verifyToken, getNotifications);
router.patch("/read/:id", verifyToken, markAsRead);
router.delete("/:id", verifyToken, deleteNotification);
router.delete("/", verifyToken, clearAllNotifications);

export default router;
