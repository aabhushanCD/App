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

  // Send Call request. when one user calls another
  socket.on("call-user", (data) => {
    io.to(data.receiverId).emit("incoming-call", {
      from: userId,
      name: data.name,
    });
  });
  // Accept Call
  socket.on("call-accepted", ({ receiverId }) => {
    io.to(receiverId).emit("call-accepted", {
      from: userId,
    });
  });

  // Reject Call
  socket.on("call-rejected", ({ receiverId }) => {
    io.to(receiverId).emit("call-rejected", {
      from: userId,
    });
  });

  // WebRTC offer. when caller sends offer SDP
  socket.on("offer", (data) => {
    io.to(data.receiverId).emit("offer", { sdp: data.sdp, from: userId });
  });

  // WebRTC answer. when callee sends answer SDP
  socket.on("answer", (data) => {
    io.to(data.receiverId).emit("answer", { sdp: data.sdp, from: userId });
  });

  //  ICE candidates
  socket.on("ice-candidate", (data) => {
    io.to(data.receiverId).emit("ice-candidate", {
      candidate: data.candidate,
      from: userId,
    });
  });
  // End Call
  socket.on("end", (data) => {
    io.to(data.receiverId).emit("call-ended", { from: userId });
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
export { io, server, app };
