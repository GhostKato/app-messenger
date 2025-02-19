"use client";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessageWS, updateMessageWS, deleteMessageWS, addNotificationWS, deleteNotificationWS } from "@/redux/messages/slice";
import { updateUserStatus } from "@/redux/user/slice";
import { MessageType } from "@/types/messageTypes";
import { SOCKET_URL } from "@/constants/сonstants";
import { io, Socket } from "socket.io-client";
import { selectUser, selectIsLoggedIn } from "@/redux/auth/selectors";

export const socketRef = { current: null as Socket | null };

const WebSocket = () => {
  const dispatch = useDispatch();
  const socketRef = useRef<Socket | null>(null);
  const user = useSelector(selectUser);
  const userId = user?._id;
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      if (socketRef.current) {
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
      if (userId) {
        socketIo.emit("register", userId);
        socketIo.emit("userOnline", { userId });
      }
    });

    socketIo.on("newMessage", (message: MessageType) => {
      if (userId === message.fromId || userId === message.toId) {
        const path = window.location.pathname;
        if (path === `/message/${message.toId}` || path === `/message/${message.fromId}`) {
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

    socketIo.on("addNotification", (message: MessageType) => {
      if (userId === message.fromId || userId === message.toId) {       
        dispatch(addNotificationWS(message));
      }
    });

socketIo.on("deleteNotification", ({ fromId }) => {
      dispatch(deleteNotificationWS(fromId)); 
    });

    socketIo.on("updateUserStatus", ({ userId, status }) => {
      dispatch(updateUserStatus({ userId, status }));
    });

    socketIo.on("connect_error", (err) => {
      console.error("❌ WebSocket Error:", err);
    });

    socketIo.on("disconnect", () => {      
    });

    return () => {
      if (socketIo.connected && userId) {
        dispatch(updateUserStatus({ userId, status: "offline" }));
        socketIo.disconnect();
      }
      socketRef.current = null;
    };
  }, [dispatch, userId, isLoggedIn]);

  return null;
};

export default WebSocket;
