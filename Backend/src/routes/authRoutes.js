// src/routes/authRoutes.js
import express from "express";
import { signup, Login, LogOut } from "../controllers/authController.js";

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", Login);

//logout route
router.post("/logout", LogOut);
export default router;
