'use client';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import React from 'react';

const Welcome: React.FC = () => {

  const router = useRouter();

  const handleLoginClick = () => {    
    router.push('/login');
  };

  const handleRegistrationClick = () => {    
    router.push('/registration');
  };

  return (
    <div>
      <h1>Welcome page</h1>
      <Button onClick={handleLoginClick}>Login</Button>
      <Button onClick={handleRegistrationClick}>Registration</Button>
    </div>
  );
}

export default Welcome;