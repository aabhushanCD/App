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
  sendPassResetMail,
} from "../controller/authController.js";
import upload from "../middleware/multer.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { Search } from "../controller/searchController.js";
const router = express.Router();

// ________________________api/auth____________________
router.post("/login", Login);
router.post("/register", Register);
router.post("/logout", verifyToken, LogOut);

router.get("/me", verifyToken, authUser);
router.post("/search", verifyToken, Search);
router.post("/sendPassResetMail", sendPassResetMail);

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
