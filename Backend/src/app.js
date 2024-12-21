// src/app.js

import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
// Base route for authentication

export default app;
