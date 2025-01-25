'use client';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import React from 'react';

const Message: React.FC = () => {

  const router = useRouter();

   const handleBackClick = () => {    
    router.push('/message');
  };

  return (
    <div className='relative bg-cool-gradient bg-[length:200%_200%] animate-gradient-move min-h-screen shadow-custom-inset'>
      <Button variant="back" onClick={handleBackClick}>Back</Button>
      <h1 className="text-3xl font-bold text-center p-8">Message </h1>
    </div>
  );
}

export default Message;