'use client'
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageWS, updateMessageWS, deleteMessageWS } from '@/redux/messages/slice';
import { MessageType } from '@/types/messageTypes';
import { SOCKET_URL } from '@/constants/сonstants';
import { io, Socket } from 'socket.io-client';
import { selectUser, selectIsLoggedIn } from '@/redux/auth/selectors';  

const WebSocket = () => {
  const dispatch = useDispatch();
  const socketRef = useRef<Socket | null>(null); 
  const user = useSelector(selectUser);   
  const userId = user._id;
  const isLoggedIn = useSelector(selectIsLoggedIn);  

  useEffect(() => {
    if (!isLoggedIn) {      
      if (socketRef.current) {
        socketRef.current.disconnect(); 
      }
      return;  
    }

    if (socketRef.current) return;  

    const socketIo = io(SOCKET_URL, {
      transports: ['websocket'],
      withCredentials: true,
    });

    socketRef.current = socketIo;

    socketIo.on('connect', () => {
      console.log('WebSocket connected via Socket.IO');
      
      if (userId) {
        socketIo.emit('register', userId);
      }
    });

    socketIo.on('newMessage', (message: MessageType) => {
  if (userId === message.fromId || userId === message.toId) {
    if (window.location.pathname === `/message/${message.toId}` || window.location.pathname === `/message/${message.fromId}`) {
      dispatch(addMessageWS(message));
    }
  }
});

    socketIo.on('updateMessage', (message: MessageType) => {
      dispatch(updateMessageWS(message)); 
    });

    socketIo.on('deleteMessage', (id: string) => {
      dispatch(deleteMessageWS(id)); 
    });

    socketIo.on('connect_error', (err) => {
      console.error('Socket.IO error:', err);
    });

    socketIo.on('disconnect', () => {
      console.log('WebSocket disabled via Socket.IO');
    });

    return () => {
      if (socketIo.connected) {
        socketIo.disconnect();
      }
    };
  }, [dispatch, userId, isLoggedIn]);  

  return null;  
};

export default WebSocket;
