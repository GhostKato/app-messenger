'use client';
import Button from '@/components/Button';
import MessageForm from '@/components/MessageForm';
import MessageText from '@/components/MessageText';
import { fetchMessages } from '@/redux/messages/operations';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { selectMessages } from '../../../redux/messages/selectors';

const Message: React.FC = () => {  

  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector(selectMessages);

  console.log(messages);  
  
  
  useEffect(() => {
      dispatch(fetchMessages()); 
    }, [dispatch]);  


   const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, []);

  const router = useRouter();

  const handleBackClick = () => {
    router.push('/message');
  };

  return (   
    <div className='message-id flex flex-col relative shadow-custom-inset min-h-screen bg-cover bg-center pb-[1px]'>     
      <Button variant="back" onClick={handleBackClick}><FaArrowLeft className='text-interaction group-hover:text-white w-[25px] h-[25px] md:w-[35px] md:h-[35px] xl:w-[45px] xl:h-[45px]'/></Button>
      <div  className="bg-cool-gradient bg-[length:200%_200%] animate-gradient-move shadow-custom p-[10px] md:p-[29px] xl:p-[32px]">
        <h1 className="text-3xl font-bold text-center">Messages</h1>
      </div>
      <ul  ref={listRef} className='flex flex-col flex-grow gap-[30px] overflow-auto p-[10px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-black'>
        {messages.map((message) => (
          <MessageText key={message._id} message={message.message} from={message.from} />
        ))}        
      </ul>
       <MessageForm/>
    </div>
  );
}

export default Message;
