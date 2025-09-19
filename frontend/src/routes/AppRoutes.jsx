import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route />
          </Route>
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
