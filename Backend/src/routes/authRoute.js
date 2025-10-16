import express from "express";
import {
  Login,
  Register,
  LogOut,
  profileUpdate,
  authUser,
  addHighlight,
  getHighlights,
  getUserProfile,
} from "../controller/authController.js";
import upload from "../middleware/multer.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.post("/logout", verifyToken, LogOut);

router.get("/me", verifyToken, authUser);

// -------------profile-----------------------

router.put(
  "/updateProfile",
  verifyToken,
  upload.single("profile"),
  profileUpdate
);
// /api/profile/
router.get("/getUserProfile/:Id", verifyToken, getUserProfile);

// /api/highlight/
router.post("/addHighlight", verifyToken, addHighlight);
router.get("/getHighlights", verifyToken, getHighlights);

export default router;
