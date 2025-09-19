import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./src/routes/authRoute.js";
import { ConnectDB } from "./src/db/ConnectDb.js";
import postRoutes from "./src/routes/postRoute.js";
dotenv.config({ path: ".env" });

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8000;

app.use("/api/auth/", authRoutes);
app.use("/api/post/", postRoutes);

ConnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to database", err);
    process.exit(1); // stop the server if DB fails
  });
