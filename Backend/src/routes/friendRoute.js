import express from "express";
import {
  sendRequest,
  getAllFriends,
  getAllRequests,
  acceptRequest,
} from "../controller/friendController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getUsers } from "../controller/authController.js";

const router = express.Router();

router.get("/getAllFriends", verifyToken, getAllFriends);
router.get("/getAllRequest", verifyToken, getAllRequests);
router.post("/sendRequest/:toId", verifyToken, sendRequest);
router.get("/getAllUsers", verifyToken, getUsers);
router.post("/acceptRequest/:friendId", verifyToken, acceptRequest);
export default router;
