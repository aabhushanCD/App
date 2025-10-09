import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";
import { SocketApi } from "@/constants";
import { useAuth } from "./AuthStore";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!currentUser?.userId) return;

    // Prevent duplicate connection
    if (!socketRef.current) {
      const newSocket = io(SocketApi, {
        auth: { userId: currentUser.userId },
        withCredentials: true,
      });

      socketRef.current = newSocket;
      setSocket(newSocket); // ✅ updates context value

      console.log("✅ Socket Connected:", currentUser.userId);

      newSocket.on("connect_error", (err) => {
        console.error("❌ Socket connection error:", err.message);
      });

      newSocket.on("disconnect", () => {
        console.log("🔌 Socket Disconnected");
      });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
      setSocket(null);
      console.log("🧹 Socket Cleaned up");
    };
  }, [currentUser]);

  return (
    <NotificationContext.Provider value={socket}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotify = () => {
  const socket = useContext(NotificationContext);
  if (!socket) {
    console.warn(
      "⚠️ useNotify must be used within NotificationProvider or socket not connected yet."
    );
  }
  return socket;
};
