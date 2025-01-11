import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { myProfile, userProfile } from "../controllers/userController.js";
import { upload } from "../middlewares/multer.js";
import {
  coverPhotoUpload,
  profilePhotoUpload,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/me", isAuth, myProfile);
router.get("/:id", isAuth, userProfile);
router.get("/", isAuth);
router.post("/profilePicture",upload.single("profilePicture"),profilePhotoUpload);
router.post("/coverPhoto", upload.single("cover"), coverPhotoUpload);
export default router;
