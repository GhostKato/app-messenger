'use client';
import React from 'react';
// import { useRouter } from 'next/navigation';
// import Button from '@/components/Button';
import MessageForm from './MessageForm';

const NewMessage: React.FC = () => {

  // const router = useRouter();

  // const handleMessageClick = () => {    
  //   router.push('/message');
  // };

  return (
    <div className=''>      
      <MessageForm/>
      {/* <Button onClick={handleMessageClick}>Go to message</Button> */}
    </div>
  );
}

export default NewMessage;