'use client';
import React from 'react';

type MessageTextProps = {  
  message: string; 
};

const MessageText: React.FC<MessageTextProps> = ({ message }) => {
  return (  
    <li className="w-[300px] bg-two text-3xl font-bold text-center p-8">{message}</li>
  );
}

export default MessageText;
