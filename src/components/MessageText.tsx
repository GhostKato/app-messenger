'use client';
import React from 'react';

const user = [
  { id: 1, name: 'Mark Deimon', icon: '/photo.jpg', status: 'online' },
];

type MessageTextProps = {  
  message: string;
  from: string;
};

const MessageText: React.FC<MessageTextProps> = ({ message, from }) => {
 
  const isFromUser = user[0].id === parseInt(from);

  return (  
    <li className={`p-5 w-[300px] lg:w-[520px] xl:w-[800px] rounded-[20px] ${isFromUser ? 'ml-auto bg-sending' : 'mr-auto bg-receiving'}`}>
      <p className="text-xl xl:text-2xl">{message}</p>
    </li>
  );
}

export default MessageText;
