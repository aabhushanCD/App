import React from "react";

const SideBar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "0.0px solid black",
        width: "30%",
      }}
    >
      <div style={{ margin: "auto" }}>
        Search {" "}
        <input type="text" />
      </div>
      <div></div>
    </div>
  );
};

export default SideBar;
