import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import { allowedOrigins } from "./constant.js";
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
  console.log("Socket Server is connected", socket.id);
  socket.on("message", (data) => {
    console.log("Message from client:", data);
    io.emit("message", data);
  });
  socket.on("disconnect", () => {
    console.log("User disconnect", socket.id);
  });
});
export { io, server, app };
