import React, { useContext } from "react";

import { IoIosLogOut } from "react-icons/io";
import { AuthContext } from "../store/auth";
import { Link } from "react-router-dom";
const LogOut = () => {
  const { authValue, setAuthValue } = useContext(AuthContext);
  const handleClick = () => {
    setAuthValue(null);
  };
  return (
    <div>
      <Link
        to="/"
        onClick={handleClick}
        style={{ textDecoration: "none", color: "black" }}
      >
        <IoIosLogOut style={{ marginRight: "0.5rem", fontSize: "40px" }} />
      </Link>
    </div>
  );
};

export default LogOut;
