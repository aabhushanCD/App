import express from "express";
import {
  Login,
  Register,
  LogOut,
  profileUpdate,
  authUser,
} from "../controller/authController.js";
import upload from "../middleware/multer.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.post("/logout", verifyToken, LogOut);
router.put(
  "/updateProfile",
  verifyToken,
  upload.single("profile"),
  profileUpdate
);
router.get("/me", verifyToken, authUser);
export default router;
