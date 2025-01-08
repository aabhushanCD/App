// src/index.js

import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/connect.js";
import { WebSocketServer } from "ws";

dotenv.config();

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
