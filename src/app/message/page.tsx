'use client'
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowLeft } from "react-icons/fa";

const Message: React.FC = () => {

   const router = useRouter();

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <div className="bg-cool-gradient bg-[length:200%_200%] animate-gradient-move min-h-screen message-container flex justify-center items-center shadow-custom-inset">
      <Button variant="back" onClick={handleBackClick}><FaArrowLeft className='text-interaction group-hover:text-white w-[25px] h-[25px] md:w-[35px] md:h-[35px] xl:w-[45px] xl:h-[45px]' /></Button>
    </div>
  );
}

export default Message;
