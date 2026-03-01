import { useEffect, useState } from "react";
import "./App.css";

import AppRoutes from "./routes/AppRoutes";
import { useNotify } from "./features/notification/NotificationStore";

import CallPopup from "./components/CallPopup";
import AudioVideo from "./components/Audio_Video";

function App() {
  const socket = useNotify();
  const [incomingCall, setIncomingCall] = useState(null);
  const [activeCall, setActiveCall] = useState(null);
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
            setActiveCall(incomingCall);
            setIncomingCall(null);
          }}
          onReject={() => {
            socket.emit("call-rejected", { receiverId: incomingCall.from });
            setIncomingCall(null);
          }}
        />
      )}

      <div className="relative w-full max-h-screen">
        {activeCall && (
          <div className="absolute top-0 left-0 h-screen">
            <AudioVideo
              remoteUserId={activeCall.from}
              onEndCall={() => setActiveCall(null)}
              setVideoCall={setActiveCall}
            />
          </div>
        )}
      </div>
      <AppRoutes />
    </>
  );
}

export default App;
