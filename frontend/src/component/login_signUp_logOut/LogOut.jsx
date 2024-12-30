import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
const LogOut = () => {
  const handleClick = async () => {
    //   const response = await fetch("http://localhost:8000/api/auth/logout", {
    //     method: "POST",
    //     body: JSON.stringify(localStorage.getItem("user.id")),
    //     credentials: "include",
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
    //   const result = await response.json();
    // console.log("Response Data:", result);
    localStorage.removeItem("user");
  };
  return (
    <div>
      <a
        href="/"
        onClick={handleClick}
        style={{ textDecoration: "none", color: "black" }}
      >
        <IoIosLogOut style={{ marginRight: "0.5rem", fontSize: "40px" }} />
      </a>
    </div>
  );
};

export default LogOut;
