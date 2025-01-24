'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

const Login: React.FC = () => {

  const router = useRouter();

  const handleMessageClick = () => {    
    router.push('/message');
  };

  return (
    <div className='bg-cool-gradient bg-[length:200%_200%] animate-gradient-move min-h-screen'>
      <h1>Login page</h1>
      <Button onClick={handleMessageClick}>Go to message</Button>
    </div>
  );
}

export default Login;