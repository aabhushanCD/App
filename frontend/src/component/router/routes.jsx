import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Login from "../login_signUp_logOut/Login";
import Signup from "../login_signUp_logOut/SignUp";
import Home from ".././dashboard/home";
import Posts from "../posts/addPost";
import DisplayPostBox from "../posts/displayPostBox";

import Profile from "../profile/Profile";
import SideBar from "../sideBar/SideBar";
function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/post" element={<Posts />} />
      <Route path="/displayPost" element={<DisplayPostBox />} />
      <Route path="/sideBar" element={<SideBar />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default Routers;
