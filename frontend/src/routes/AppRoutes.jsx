import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Signup from "@/features/auth/pages/SignupPage";
import Login from "@/features/auth/pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoutes from "./PublicRoutes";
import Home from "@/components/Home";
import Profile from "@/features/profile/MyProfile";
import Audio_Video from "@/components/Audio_Video";
import FriendContainer from "@/features/friend/FriendContainer";
import Messanger from "@/features/message/Messanger";
import OtherProfile from "@/features/profile/OtherProfile";
import ForgetPassword from "@/features/auth/pages/ForgetPasswordPage";
import ResetPassword from "@/features/auth/pages/ResetPasswordPage";
import NotificationPage from "@/features/notification/NotificationPage";

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
          <Route path="/user/profile/:Id" element={<OtherProfile />} />
          <Route
            path="/notification"
            element={<NotificationPage></NotificationPage>}
          />
          {/* Add more protected routes here */}
        </Route>
        <Route
          path="/messanger"
          element={
            <ProtectedRoute>
              <Messanger />
            </ProtectedRoute>
          }
        />

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
