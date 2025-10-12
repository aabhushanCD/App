import { useEffect, useRef, useState } from "react";
import { useNotify } from "./store/NotificationStore";

export const useWebRTC = (remoteUserId) => {
  const socket = useNotify();
  const peer = useRef(
    new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    })
  );

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  useEffect(() => {
    const pc = peer.current;

    pc.onicecandidate = (event) => {
      if (event.candidate && remoteUserId) {
        socket.emit("ice-candidate", {
          receiverId: remoteUserId,
          candidate: event.candidate,
        });
      }
    };

    pc.ontrack = (event) => setRemoteStream(event.streams[0]);

    return () => pc.close();
  }, [remoteUserId]);

  const startLocalStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    stream.getTracks().forEach((track) => peer.current.addTrack(track, stream));
    setLocalStream(stream);
  };

  const createOffer = async () => {
    const offer = await peer.current.createOffer();
    await peer.current.setLocalDescription(offer);
    return offer;
  };

  const createAnswer = async () => {
    const answer = await peer.current.createAnswer();
    await peer.current.setLocalDescription(answer);
    return answer;
  };

  const setRemoteDescription = async (sdp) => {
    await peer.current.setRemoteDescription(new RTCSessionDescription(sdp));
  };

  const addIceCandidate = async (candidate) => {
    await peer.current.addIceCandidate(new RTCIceCandidate(candidate));
  };

  return {
    peer,
    localStream,
    remoteStream,
    startLocalStream,
    createOffer,
    createAnswer,
    setRemoteDescription,
    addIceCandidate,
  };
};
