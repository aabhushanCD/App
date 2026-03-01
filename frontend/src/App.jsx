import { useEffect, useState } from "react";
import "./App.css";

import AppRoutes from "./routes/AppRoutes";
import { useNotify } from "./features/notification/NotificationStore";

import CallPopup from "./components/CallPopup";

function App() {
  const socket = useNotify();
  const [incomingCall, setIncomingCall] = useState(null);
  useEffect(() => {
    if (!socket) return;
    const handleIncomingCall = ({ from, name }) => {
      setIncomingCall({ from, name });
    };
    socket.on("incoming-call", handleIncomingCall);

    return () => {
      socket.off("incoming-call", handleIncomingCall);
    };
  }, [socket]);
  return (
    <>
      {incomingCall && (
        <CallPopup
          caller={incomingCall}
          onAccept={() => {
            socket.emit("call-accepted", { receiverId: incomingCall.from });
            setIncomingCall(null);
          }}
          onReject={() => {
            socket.emit("call-rejected", { receiverId: incomingCall.from });
            setIncomingCall(null);
          }}
        />
      )}
      <AppRoutes />
    </>
  );
}

export default App;
