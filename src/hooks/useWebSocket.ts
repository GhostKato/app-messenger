import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMessageWS, updateMessageWS, deleteMessageWS } from '@/redux/messages/slice';
import { MessageType } from '@/types/messageTypes';
import { SOCKET_URL } from '@/constants/сonstants';
import { io, Socket } from 'socket.io-client';

const useWebSocket = () => {
  const dispatch = useDispatch();
  const socketRef = useRef<Socket | null>(null); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (socketRef.current) return; 

    const socketIo = io(SOCKET_URL, {
      transports: ['websocket'],
      withCredentials: true,
    });

    socketRef.current = socketIo; 

    socketIo.on('connect', () => {
      console.log('WebSocket підключено через Socket.IO');
      setError(null);
    });

    socketIo.on('newMessage', (message: MessageType) => {
      dispatch(addMessageWS(message)); 
    });

    socketIo.on('updateMessage', (message: MessageType) => {
      dispatch(updateMessageWS(message)); 
    });

    socketIo.on('deleteMessage', (id: string) => {
      dispatch(deleteMessageWS(id)); 
    });

    socketIo.on('connect_error', (err) => {
      console.error('Socket.IO помилка:', err);
      setError('Сталася помилка при з\'єднанні з WebSocket сервером. Спробуйте ще раз.');
    });

    socketIo.on('disconnect', () => {
      console.log('WebSocket відключено через Socket.IO');
    });

    return () => {
      if (socketIo.connected) {
        socketIo.disconnect();
      }
    };
  }, [dispatch]);

  const sendMessage = (message: MessageType) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('newMessage', message);
    } else {
      console.error('WebSocket не відкритий для з\'єднання');
    }
  };

  return { sendMessage, error };
};

export default useWebSocket;
