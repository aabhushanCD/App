import React from "react";

import { io, Socket } from "socket.io-client";

const socket = io("http://localhost:8000", {
  withCredentials: true,
});

const SocketJs = () => {
  socket();
  return <div>socket</div>;
};

export default SocketJs;
