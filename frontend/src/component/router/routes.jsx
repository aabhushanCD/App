import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Login from "../login_signUp/Login";
import Signup from "../login_signUp/SignUp";
import Home from ".././dashboard/home";
import Posts from "../posts/post";
import DisplayPost from "../posts/displayPost";
function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/post" element={<Posts />} />
      <Route path="/displayPost" element={<DisplayPost />} />
    </Routes>
  );
}

export default Routers;
