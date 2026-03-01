import { useWebRTC } from "@/useWebRtc";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { useNotify } from "@/features/notification/NotificationStore";
import { useAuth } from "@/features/auth/authContext";

const AudioVideo = ({ remoteUserId, onEndCall, setVideoCall }) => {
  const { currentUser } = useAuth();
  const socket = useNotify();
  const {
    localStream,
    remoteStream,
    startLocalStream,
    createOffer,
    createAnswer,
    setRemoteDescription,
    addIceCandidate,
    closeConnection,
  } = useWebRTC(remoteUserId);

  useEffect(() => {
    socket.on("offer", async ({ sdp, from }) => {
      await startLocalStream();
      await setRemoteDescription(sdp);
      const answer = await createAnswer();
      socket.emit("answer", { receiverId: from, sdp: answer });
    });

    socket.on("answer", async ({ sdp }) => {
      await setRemoteDescription(sdp);
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      await addIceCandidate(candidate);
    });

    socket.on("call-ended", () => {
      closeConnection();
      onEndCall?.();
    });

    socket.on("call-user", ({ from }) => {
      const accepted = window.confirm("Incoming Call. Accept?");
      if (accepted) {
        socket.emit("call-accepted", { receiverId: from });
      } else {
        socket.emit("call-rejected", { receiverId: from });
      }
    });
    socket.on("call-accepted", async ({ from }) => {
      await startLocalStream();

      const offer = await createOffer();
      socket.emit("offer", {
        receiverId: from,
        sdp: offer,
      });
    });
    socket.on("incoming-call", ({ from }) => {
      const accepted = window.confirm("Incoming Call. Accept?");

      if (accepted) {
        socket.emit("call-accepted", { receiverId: from });
      } else {
        socket.emit("call-rejected", { receiverId: from });
      }
    });

    socket.on("call-rejected", () => {
      alert("Call Rejected");
    });
    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("call-ended");
      socket.off("incoming-call");
      socket.off("call-accepted");
      socket.off("call-rejected");
    };
  }, [socket, remoteUserId]);

  const callUser = async () => {
    socket.emit("call-user", {
      receiverId: remoteUserId,
      name: currentUser.name,
    });
  };

  const endCall = () => {
    socket.emit("end", { receiverId: remoteUserId });
    setVideoCall(false);
    closeConnection();
    onEndCall?.();
  };

  return (
    <div className="w-full h-full  bg-gray-900 flex justify-center items-center relative">
      {/* Remote video */}

      <video
        autoPlay
        playsInline
        className="w-full h-full object-cover rounded-lg"
        ref={(v) => v && (v.srcObject = remoteStream)}
      />

      {/* Local video */}
      <video
        autoPlay
        playsInline
        className="absolute top-4 right-4 w-32 h-32 rounded-md border-2 border-white object-cover shadow-lg"
        ref={(v) => v && (v.srcObject = localStream)}
      />

      {/* Controls */}
      <div className="absolute bottom-5 flex gap-4">
        <Button
          onClick={callUser}
          className="bg-green-500 hover:bg-green-600 shadow-md"
        >
          Call
        </Button>
        <Button
          onClick={endCall}
          className="bg-red-500 hover:bg-red-600 shadow-md"
        >
          End
        </Button>
      </div>
    </div>
  );
};

export default AudioVideo;
