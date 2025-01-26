'use client';
import RegistrationForm from '@/components/RegistrationForm';
// import Button from '@/components/Button';
// import { useRouter } from 'next/navigation';
import React from 'react';

const Registration: React.FC = () => {

  // const router = useRouter();

//  const handleMessageClick = () => {    
//     router.push('/message');
//   };

  return (
    <div className='flex flex-col justify-center items-center w-screen bg-cool-gradient bg-[length:200%_200%] animate-gradient-move min-h-screen'>
      <h1>Registration page</h1>
      <RegistrationForm/>
      {/* <Button onClick={handleMessageClick}>Go to message</Button> */}
    </div>
  );
}

export default Registration;