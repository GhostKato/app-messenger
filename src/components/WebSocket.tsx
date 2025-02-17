"use client";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessageWS, updateMessageWS, deleteMessageWS } from "@/redux/messages/slice";
import { updateUserStatus } from "@/redux/user/slice";
import { MessageType } from "@/types/messageTypes";
import { SOCKET_URL } from "@/constants/сonstants";
import { io, Socket } from "socket.io-client";
import { selectUser, selectIsLoggedIn } from "@/redux/auth/selectors";

const WebSocket = () => {
  const dispatch = useDispatch();
  const socketRef = useRef<Socket | null>(null);
  const user = useSelector(selectUser);
  const userId = user?._id;
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn || !userId) {
      if (socketRef.current) {
        socketRef.current.emit("userOffline", { userId });
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    if (socketRef.current) return;

    const socketIo = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketRef.current = socketIo;

    socketIo.on("connect", () => {
      console.log("✅ WebSocket підключено");
      
      if (userId) {
        socketIo.emit("register", userId);
        socketIo.emit("userOnline", { userId });
      }
    });
    
    socketIo.on("allUserStatuses", (users) => {
      
      for (const userId in users) {
        const status = users[userId].status;
        dispatch(updateUserStatus({ userId, status }));
      }
    });

    socketIo.on("newMessage", (message: MessageType) => {
      if (userId === message.fromId || userId === message.toId) {
        if (
          window.location.pathname === `/message/${message.toId}` ||
          window.location.pathname === `/message/${message.fromId}`
        ) {
          dispatch(addMessageWS(message));
        }
      }
    });

    socketIo.on("updateMessage", (message: MessageType) => {
      dispatch(updateMessageWS(message));
    });

    socketIo.on("deleteMessage", (id: string) => {
      dispatch(deleteMessageWS(id));
    });
    
    socketIo.on("updateUserStatus", ({ userId, status }) => {
      dispatch(updateUserStatus({ userId, status }));
    });

    socketIo.on("connect_error", (err) => {
      console.error("❌ Помилка WebSocket:", err);
    });

    socketIo.on("disconnect", () => {
      console.log("🔴 WebSocket відключено");
    });

    return () => {
      if (socketIo.connected) {
        if (userId) {
          socketIo.emit("userOffline", { userId }); 
        }
        socketIo.disconnect();
      }
      socketRef.current = null;
    };
  }, [dispatch, userId, isLoggedIn]);

  return null;
};

export default WebSocket;
