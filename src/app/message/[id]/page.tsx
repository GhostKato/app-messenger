'use client';
import Button from '@/components/Button';
import MessageText from '@/components/MessageText';
import NewMessage from '@/components/NewMessage';
import { useRouter } from 'next/navigation';
import React from 'react';

const Message: React.FC = () => {  

  const messages = [
    { id: 1, text: 'Mark Deimonорпопрорполролр парарапр праерара авпрпавпр', from: '1', for: '2' },
    { id: 2, text: 'Mark Deimon парапрапра рпарапрпа авпрапрапр павпрапрап', from: '2', for: '1' },
    { id: 3, text: 'Mark Deimon павпвап павпавпв пвапавпав пвапавпавп', forom: '1', for: '2' },
    { id: 4, text: 'Mark Deimon пвапавпвапвапвапвапва', forom: '2', for: '1' },
    { id: 5, text: 'Mark Deimonорпопрорполролр парарапр праерара авпрпавпр', from: '1', for: '2' },
    { id: 6, text: 'Mark Deimon парапрапра рпарапрпа авпрапрапр павпрапрап', from: '1', for: '2' },
    { id: 7, text: 'Mark Deimon павпвап павпавпв пвапавпав пвапавпавп', forom: '2', for: '1' },
    { id: 8, text: 'Mark Deimon пвапавпвапвапвапвапва', forom: '1', for: '2' },
    { id: 9, text: 'Mark Deimonорпопрорполролр парарапр праерара авпрпавпр', from: '1', for: '2' },
    { id: 10, text: 'Mark Deimon парапрапра рпарапрпа авпрапрапр павпрапрап', from: '2', for: '1' },
    { id: 11, text: 'Mark Deimon павпвап павпавпв пвапавпав пвапавпавп', forom: '1', for: '2' },
    { id: 12, text: 'Mark Deimon пвапавпвапвапвапвапва', forom: '2', for: '1' },
  ];

  const router = useRouter();

  const handleBackClick = () => {
    router.push('/message');
  };

  return (
    <div className='flex flex-col relative bg-cool-gradient bg-[length:200%_200%] animate-gradient-move min-h-screen shadow-custom-inset'>
      <Button variant="back" onClick={handleBackClick}>Back</Button>
      <h1 className="text-3xl font-bold text-center p-8">Messages</h1>
      <ul className='bg-three flex flex-col flex-grow gap-[30px] overflow-auto p-[10px]'>
        {messages.map((message) => (
          <MessageText key={message.id} message={message.text} from={message.from} />
        ))}        
      </ul>
      <NewMessage/>
    </div>
  );
}

export default Message;
