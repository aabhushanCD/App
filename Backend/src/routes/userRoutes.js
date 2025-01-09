import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { myProfile, userProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", isAuth, myProfile);
router.get("/:id", isAuth, userProfile);
router.get("/", isAuth);
export default router;
