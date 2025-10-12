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
  const userId = socket.handshake.auth.userId;
  if (userId) socket.join(userId);
  console.log(`User ${userId} joined their room`);

  // when one user calls another
  socket.on("call-user", (data) => {
    io.to(data.receiverId).emit("incoming-call", {
      from: userId,
      name: data.name,
    });
  });

  // when caller sends offer SDP
  socket.on("offer", (data) => {
    io.to(data.receiverId).emit("offer", { sdp: data.sdp, from: userId });
  });

  // when callee sends answer SDP
  socket.on("answer", (data) => {
    io.to(data.receiverId).emit("answer", { sdp: data.sdp, from: userId });
  });

  // send ICE candidates
  socket.on("ice-candidate", (data) => {
    io.to(data.receiverId).emit("ice-candidates", {
      candidate: data.candidate,
      from: userId,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
export { io, server, app };
