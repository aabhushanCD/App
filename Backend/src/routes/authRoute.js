import express from "express";
import {
  Login,
  Register,
  LogOut,
  AuthUser,
} from "../controller/authController.js";
const app = express();
app.route("/login", Login);
app.route("/register", Register);
app.route("/logOut", LogOut);
app.route("/auth", AuthUser);
export default app;
