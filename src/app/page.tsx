'use client';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import React from 'react';

const Home: React.FC = () => {

  const router = useRouter();

  const handleLoginClick = () => {    
    router.push('/login');
  };

  const handleRegistrationClick = () => {    
    router.push('/registration');
  };

  return (
    <div className='home-container bg-main'>
      <h1>Home page</h1>
      <Button onClick={handleLoginClick}>Login</Button>
      <Button onClick={handleRegistrationClick}>Registration</Button>
    </div>
  );
}

export default Home;