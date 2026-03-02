import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useNotify } from "./features/notification/NotificationStore";

import CallPopup from "./components/CallPopup";
import AudioVideo from "./components/Audio_Video";

function App() {
  const socket = useNotify();
  const [incomingCall, setIncomingCall] = useState(null); // for receiver popup
  const [outgoingCall, setOutgoingCall] = useState(null); // for caller “Calling…”
  const [activeCall, setActiveCall] = useState(null); // ongoing video call

  useEffect(() => {
    if (!socket) return;

    // 🔹 Receiver gets a call
    const handleIncomingCall = ({ from, name }) => {
      setIncomingCall({ from, name });
    };

    // 🔹 Receiver accepts the call
    const handleCallAccepted = ({ from }) => {
      setOutgoingCall(null); // stop “Calling…” UI
      setActiveCall({ from });
    };

    // 🔹 Receiver rejects the call
    const handleCallRejected = ({ from }) => {
      alert("Call Rejected by user", from);
      setOutgoingCall(null);
    };

    // 🔹 Call ended
    const handleCallEnded = () => {
      setActiveCall(null);
    };

    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);
    socket.on("call-rejected", handleCallRejected);
    socket.on("call-ended", handleCallEnded);

    return () => {
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
      socket.off("call-rejected", handleCallRejected);
      socket.off("call-ended", handleCallEnded);
    };
  }, [socket]);

  return (
    <>
      {/* Receiver Popup */}
      {incomingCall && !activeCall && (
        <CallPopup
          caller={incomingCall}
          onAccept={() => {
            socket.emit("call-accepted", { receiverId: incomingCall.from });
            setActiveCall({ from: incomingCall.from });
            setIncomingCall(null);
          }}
          onReject={() => {
            socket.emit("call-rejected", { receiverId: incomingCall.from });
            setIncomingCall(null);
          }}
        />
      )}

      {/* Caller “Calling…” popup */}
      {outgoingCall && !activeCall && (
        <CallPopup
          caller={outgoingCall}
          isCalling={true} // show “Calling…”
          onCancel={() => {
            socket.emit("call-ended", { receiverId: outgoingCall.from });
            setOutgoingCall(null);
          }}
        />
      )}

      {/* Active video call */}
      {activeCall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <AudioVideo
            remoteUserId={activeCall.from}
            onEndCall={() => {
              socket.emit("call-ended", { receiverId: activeCall.from });
              setActiveCall(null);
            }}
            setVideoCall={setActiveCall}
          />
        </div>
      )}

      <AppRoutes />
    </>
  );
}

export default App;
