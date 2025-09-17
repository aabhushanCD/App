import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authUser from "./src/routes/authRoute.js";
import { ConnectDB } from "./src/db/ConnectDb.js";
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
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/auth/", authUser);
app.listen(PORT, () => {
  ConnectDB();
  console.log("Server is running in " + PORT);
});
