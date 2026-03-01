import { useEffect } from "react";
import "./App.css";

import AppRoutes from "./routes/AppRoutes";
import { useNotify } from "./features/notification/NotificationStore";

function App() {
  const socket = useNotify();
  useEffect(() => {
    socket.on("incoming-call", ({ from }) => {
      const accepted = window.confirm("Incoming Call. Accept?");

      if (accepted) {
        socket.emit("call-accepted", { receiverId: from });
      } else {
        socket.emit("call-rejected", { receiverId: from });
      }
    });
    return socket.off("incoming-call");
  }, [socket]);
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
