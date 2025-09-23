import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoutes from "./PublicRoutes";
import CreatePost from "@/components/CreatePost";
import Home from "@/components/Home";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          />
          <Route path="/home" element={<Home />} />

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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
