'use client';
import Button from '@/components/Button';
import MessageForm from '@/components/MessageForm';
import MessageText from '@/components/MessageText';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowLeft } from "react-icons/fa";

const Message: React.FC = () => {  
  const messages = [
    { id: 1, text: 'She decided to pursue her career in law despite the challenges ahead.', from: '1', for: '2' },
    { id: 2, text: 'She decided to pursue her career in law despite the challenges ahead.', from: '2', for: '1' },
    { id: 3, text: 'She decided to pursue her career in law despite the challenges ahead.', from: '1', for: '2' },
    { id: 4, text: 'She decided to pursue her career in law despite the challenges ahead.', from: '2', for: '1' },
    { id: 5, text: 'She decided to pursue her career in law despite the challenges ahead.', from: '1', for: '2' },
    { id: 6, text: 'She decided to pursue her career in law despite the challenges ahead.', from: '1', for: '2' },
    { id: 7, text: 'She decided to pursue her career in law despite the challenges ahead.', from: '2', for: '1' },
    { id: 8, text: 'She decided to pursue her career in law despite the challenges ahead.', from: '1', for: '2' },
    { id: 9, text: 'She decided to pursue her career in law despite the challenges ahead.', from: '1', for: '2' },
    { id: 10, text: 'She decided to pursue her career in law despite the challenges ahead.', from: '2', for: '1' },
    { id: 11, text: 'She decided to pursue her career in law despite the challenges ahead.', from: '1', for: '2' },
    { id: 12, text: 'She decided to pursue her career in law despite the challenges ahead.', from: '2', for: '1' },
  ];

  const router = useRouter();

  const handleBackClick = () => {
    router.push('/message');
  };

  return (   
    <div className='message-id flex flex-col relative shadow-custom-inset min-h-screen bg-cover bg-center pb-[15px]'>     
      <Button variant="back" onClick={handleBackClick}><FaArrowLeft className='text-interaction group-hover:text-white w-[25px] h-[25px] md:w-[35px] md:h-[35px] xl:w-[45px] xl:h-[45px]'/></Button>
      <div  className="bg-cool-gradient bg-[length:200%_200%] animate-gradient-move shadow-custom p-[10px] md:p-[29px]">
        <h1 className="text-3xl font-bold text-center">Messages</h1>
      </div>
      <ul className='flex flex-col flex-grow gap-[30px] overflow-auto p-[10px]'>
        {messages.map((message) => (
          <MessageText key={message.id} message={message.text} from={message.from} />
        ))}        
      </ul>
       <MessageForm/>
    </div>
  );
}

export default Message;
