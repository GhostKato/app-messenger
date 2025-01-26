'use client';
import React from 'react';
// import { useRouter } from 'next/navigation';
// import Button from '@/components/Button';
import LoginForm from '@/components/LoginForm';

const Login: React.FC = () => {

  // const router = useRouter();

  // const handleMessageClick = () => {    
  //   router.push('/message');
  // };

  return (
    <div className='flex flex-col justify-center items-center w-screen bg-cool-gradient bg-[length:200%_200%] animate-gradient-move min-h-screen'>
      <h1>Login page</h1>
      <LoginForm/>
      {/* <Button onClick={handleMessageClick}>Go to message</Button> */}
    </div>
  );
}

export default Login;