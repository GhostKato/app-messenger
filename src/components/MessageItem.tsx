'use client';
import React from 'react';
import { selectUser } from '../redux/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { UserType } from '@/types/userTypes';
import Button from './Button';
import { FaEdit } from "react-icons/fa";
import { closeModal, toggleModal } from '@/redux/modal/slice';

type MessageItemProps = {
  messageId: string;
  message: string;
  from: string;
  onClick: () => void; 
};

const MessageItem: React.FC<MessageItemProps> = ({ messageId, message, from, onClick }) => {
  const dispatch = useDispatch();  

  
  const user = useSelector(selectUser) as UserType;
  const isFromUser = user?._id === from;

  const handleUpdateClick = () => {
    dispatch(toggleModal({ modalId: messageId, modalType: 'messageUpdate' }));
    dispatch(closeModal({ modalId: null, modalType: 'userMenu' }));   
        
  };
  

  return (
    <li onClick={onClick} className={`p-5 rounded-[20px] relative ${isFromUser ? 'ml-auto bg-sending pr-[40px] md:pr-[50px] xl:pr-[60px]' : 'mr-auto bg-receiving'}`}>
      
      {isFromUser && (
        <Button className="absolute top-2 right-2" variant="updateMessage" onClick={handleUpdateClick}>
          <FaEdit className="text-white group-hover:text-interaction w-[25px] h-[25px] md:w-[35px] md:h-[35px]" />
        </Button>
      )}
      <p className="max-w-[300px] lg:max-w-[520px] xl:max-w-[800px] text-xl xl:text-2xl">{message}</p>
    </li>
  );
};

export default MessageItem;
