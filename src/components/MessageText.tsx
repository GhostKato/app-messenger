'use client';
import React from 'react';
import { selectUser } from '../redux/auth/selectors';
import { useSelector } from 'react-redux';
import { UserType } from '@/types/userTypes';


type MessageTextProps = {  
  message: string;
  from: string;
};

const MessageText: React.FC<MessageTextProps> = ({ message, from }) => {

  const user = useSelector(selectUser) as UserType;
 
  const isFromUser = user._id === from;

  return (  
    <li className={`p-5 w-[300px] lg:w-[520px] xl:w-[800px] rounded-[20px] ${isFromUser ? 'ml-auto bg-sending' : 'mr-auto bg-receiving'}`}>
      <p className="text-xl xl:text-2xl">{message}</p>
    </li>
  );
}

export default MessageText;
