import { useWebRTC } from "@/useWebRtc";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { useNotify } from "@/store/NotificationStore";

const AudioVideo = ({ remoteUserId }) => {
  const socket = useNotify();
  const {
    localStream,
    remoteStream,
    startLocalStream,
    createOffer,
    createAnswer,
    setRemoteDescription,
    addIceCandidate,
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

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [socket, remoteUserId]);

  const callUser = async () => {
    const offer = await createOffer();
    socket.emit("offer", { receiverId: remoteUserId, sdp: offer });
  };

  return (
    <div className=" w-full h-full bg-gray-600">
      <div className="flex gap-2 flex-col items-center  w-full relative border-2 h-full p-4">
        <div className=" flex h-[70%] rounded-md ">
          <video
            autoPlay
            muted
            playsInline
            className="w-full  rounded-md"
            ref={(v) => v && (v.srcObject = remoteStream)}
          />
        </div>
        <div className="absolute top-5 right-5">
          <video
            autoPlay
            playsInline
            className="top-0 right-0  w-30  rounded-md"
            ref={(v) => v && (v.srcObject = localStream)}
          />
        </div>
        <div className="flex gap-4">
          <Button onClick={callUser} className={"bg-green-500"}>
            Call
          </Button>
          <Button
            className={"bg-red-500"}
            onClick={() => {
              socket.off("offer");
              socket.off("answer");
              socket.off("ice-candidate");
            }}
          >
            End
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AudioVideo;
