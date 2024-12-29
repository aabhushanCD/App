import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Login from "../login_signUp/Login";
import Signup from "../login_signUp/SignUp";
import Home from ".././dashboard/home";
import Posts from "../posts/addPost";
import DisplayPost from "../posts/displayPost";
import DisplayPostBox from "../posts/displayPostBox";
function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/post" element={<Posts />} />
      <Route path="/displayPost" element={<DisplayPostBox />} />
    </Routes>
  );
}

export default Routers;
