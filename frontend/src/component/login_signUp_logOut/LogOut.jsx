import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

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
    localStorage.setItem("user", "");
  };
  return (
    <div>
      <Button onClick={handleClick}>
        <Link to="/" style={{ textDecoration: "none" }}>
          LogOut
        </Link>
      </Button>
    </div>
  );
};

export default LogOut;
