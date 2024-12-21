import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Login from "../login_signUp/Login";
import Signup from "../login_signUp/SignUp";
import Home from ".././dashboard/home";
function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default Routers;
