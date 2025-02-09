'use client';
import Button from '@/components/Button';
import MessageSendForm from '@/components/MessageSendForm';
import MessageItem from '@/components/MessageItem';
import { fetchMessages } from '@/redux/messages/operations';
import { AppDispatch, RootState } from '@/redux/store';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { selectMessages } from '../../../redux/messages/selectors';
import { MessageType } from "@/types/messageTypes";
import { refreshUser } from '@/redux/auth/operations';
import { fetchUsers } from '@/redux/user/operations';
import MessageUpdateForm from '@/components/MessageUpdateForm';
import { selectModalState } from '@/redux/modal/selectors';

const Message: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const messages = useSelector(selectMessages) as MessageType[];
  const router = useRouter();
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(null);
  const isOpenMessageUpdate = useSelector((state: RootState) =>
  selectedMessage ? selectModalState(state, selectedMessage._id, 'messageUpdate') : false
);  
  const { id } = useParams();
  const toId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    const refreshAndFetch = async () => {
      try {
        await dispatch(refreshUser());

        if (toId) {
          dispatch(fetchMessages(toId));
        }

        dispatch(fetchUsers());
      } catch (error) {
        console.error("Помилка при рефрешу токена або запиті користувачів:", error);
      }
    };

    refreshAndFetch();
  }, [dispatch, toId]);

  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleBackClick = () => {
    router.push('/message');
  };

  const handleMessageClick = (message: MessageType) => {
    setSelectedMessage(message);    
  };

  return (
    <div className='message-id flex flex-col relative shadow-custom-inset min-h-screen bg-cover bg-center pb-[1px]'>
      <Button variant="back" onClick={handleBackClick}><FaArrowLeft className='text-interaction group-hover:text-white w-[25px] h-[25px] md:w-[35px] md:h-[35px] xl:w-[45px] xl:h-[45px]' /></Button>
      <div className="bg-cool-gradient bg-[length:200%_200%] animate-gradient-move shadow-custom p-[10px] md:p-[29px] xl:p-[32px]">
        <h1 className="text-3xl font-bold text-center">Messages</h1>
      </div>

      <ul ref={listRef} className='flex flex-col flex-grow gap-[30px] overflow-auto p-[10px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-black'>
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message) => (
            <MessageItem
              key={message._id}
              messageId={message._id}
              message={message.message}
              from={message.fromId}
              onClick={() => handleMessageClick(message)}
            />
          ))
        ) : (
          <li className="text-center text-white text-2xl">No messages yet</li>
        )}
      </ul>
      
      {!isOpenMessageUpdate && selectedMessage ? (
        <MessageUpdateForm messageId={selectedMessage._id} message={selectedMessage.message} />
      ) : (
        <MessageSendForm />
      )}
    </div>
  );
};

export default Message;
