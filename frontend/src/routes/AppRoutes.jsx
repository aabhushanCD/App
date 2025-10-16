import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Layout from "../components/layout/Layout";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoutes from "./PublicRoutes";
import Home from "@/components/Home";
import Profile from "@/pages/Profile";
import Audio_Video from "@/components/Audio_Video";
import FriendContainer from "@/pages/FriendContainer";
import Messanger from "@/pages/messanger";
import OtherProfile from "@/pages/OtherProfile";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Nested routes inside Layout */}
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/web" element={<Audio_Video />} />
          <Route path="/friend" element={<FriendContainer />} />
          <Route path="/newsfeeds" element={<Home />} />
          <Route path="/messanger" element={<Messanger />} />
          <Route path="/user/profile/:Id" element={<OtherProfile />} />
          {/* Add more protected routes here */}
        </Route>

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoutes>
              <Signup />
            </PublicRoutes>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
