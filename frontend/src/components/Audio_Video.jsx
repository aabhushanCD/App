import { useWebRTC } from "@/useWebRtc";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { useNotify } from "@/store/NotificationStore";

const AudioVideo = ({ remoteUserId, onEndCall }) => {
  const socket = useNotify();
  const {
    localStream,
    remoteStream,
    startLocalStream,
    createOffer,
    createAnswer,
    setRemoteDescription,
    addIceCandidate,
    stopStream,
    closeConnection,
  } = useWebRTC(remoteUserId);

  useEffect(() => {
    startLocalStream();

    socket.on("offer", async ({ sdp, from }) => {
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
      stopStream();
      onEndCall?.();
    });

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("call-ended");
      stopStream();
    };
  }, [socket, remoteUserId]);

  const callUser = async () => {
    const offer = await createOffer();
    socket.emit("offer", { receiverId: remoteUserId, sdp: offer });
  };

  const endCall = () => {
    socket.emit("end", { receiverId: remoteUserId });
    stopStream();
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
