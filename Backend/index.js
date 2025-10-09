import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./src/routes/authRoute.js";
import { ConnectDB } from "./src/db/ConnectDb.js";
import postRoutes from "./src/routes/postRoute.js";
import { server, app } from "./socketIo.js";
import { allowedOrigins } from "./constant.js";
import notificationRoute from "./src/routes/notificationRoute.js";
import messangerRoutes from "./src/routes/messangerRoute.js";
dotenv.config({ path: ".env" });

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like Postman or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8000;

app.use("/api/auth/", authRoutes);
app.use("/api/post/", postRoutes);
app.use("/api/notification/", notificationRoute);
app.use("/api/message/", messangerRoutes);
ConnectDB()
  .then(() => {
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to database", err);
    process.exit(1); // stop the server if DB fails
  });
