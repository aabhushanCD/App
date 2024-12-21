// src/routes/authRoutes.js
import express from "express";
import { signup, Login } from "../controllers/authController.js";

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", Login);

export default router;
