'use client';
import WelcomeLogin from '@/components/WelcomeLogin';
import WelcomeLogout from '@/components/WelcomeLogout';
import React from 'react';
import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { useSelector } from 'react-redux';

const Home: React.FC = () => {
 
  const isLoggedIn = useSelector(selectIsLoggedIn);
    
  
  return (
    <div className='flex justify-center items-center bg-cool-gradient bg-[length:200%_200%] animate-gradient-move min-h-screen'>      
      {isLoggedIn ? <WelcomeLogin /> : <WelcomeLogout />}
    </div>
  );
}

export default Home;
