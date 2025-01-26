'use client';
import Button from '@/components/Button';
import MessageText from '@/components/MessageText';
import NewMessage from '@/components/NewMessage';
import { useRouter } from 'next/navigation';
import React from 'react';

const Message: React.FC = () => {

  const user = [
    { id: 1, name: 'Mark Deimon', icon: '/photo.jpg', status: 'online' },
  ];

  const messages = [
    { id: 1, text: 'Mark Deimonорпопрорполролр парарапр праерара авпрпавпр', for: '1', from: '2' },
    { id: 2, text: 'Mark Deimon парапрапра рпарапрпа авпрапрапр павпрапрап', for: '1', from: '2' },
    { id: 3, text: 'Mark Deimon павпвап павпавпв пвапавпав пвапавпавп', for: '1', from: '2' },
    { id: 4, text: 'Mark Deimon пвапавпвапвапвапвапва', for: '1', from: '2' },
  ];

  const router = useRouter();

  const handleBackClick = () => {
    router.push('/message');
  };

  return (
    <div className='flex flex-col relative bg-cool-gradient bg-[length:200%_200%] animate-gradient-move min-h-screen shadow-custom-inset'>
      <Button variant="back" onClick={handleBackClick}>Back</Button>
      <h1 className="text-3xl font-bold text-center p-8">Messages</h1>
      <ul className='bg-three flex flex-col flex-grow overflow-auto'>
        {messages.map((message) => (
          <MessageText key={message.id} message={message.text} />
        ))}        
      </ul>
      <NewMessage/>
    </div>
  );
}

export default Message;
