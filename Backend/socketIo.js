import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import { allowedOrigins } from "./constant.js";
import { Notification } from "./src/model/Notification.model.js";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId;
  if (userId) socket.join(userId);
  console.log(`User ${userId} joined their room`);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
export { io, server, app };
