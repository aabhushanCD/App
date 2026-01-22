import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoutes from "./PublicRoutes";
import Home from "@/components/Home";
import Profile from "@/pages/Profile";
import Audio_Video from "@/components/Audio_Video";
import FriendContainer from "@/pages/FriendContainer";
import Messanger from "@/pages/Messanger";
import OtherProfile from "@/pages/OtherProfile";
import ForgetPassword from "@/pages/ForgetPassword";
import ResetPassword from "@/pages/ResetPassword";

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
          <Route element={<Navigate to="/home" replace />} />
          <Route index path="/home" element={<Home />} />
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
          path="/forget-password"
          element={
            <PublicRoutes>
              <ForgetPassword />
            </PublicRoutes>
          }
        />
        <Route
          path="/reset/:id/:token"
          element={
            <PublicRoutes>
              <ResetPassword />
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
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Navigate to="/home" replace />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
