'use client';
import Button from '@/components/Button';
import Slider from '@/components/Slider';
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
    <div className='flex justify-center items-center bg-cool-gradient bg-[length:200%_200%] animate-gradient-move min-h-screen'>
      <div className='flex flex-col justify-center items-center gap-10  rounded-[20px] p-10 bg-form shadow-custom'>
        <h1 className='text-[30px] md:text-[50px]'>App messenger</h1>
        <div className='flex justify-center items-center rounded-full overflow-hidden w-[250px] h-[136px] md:w-[450px] md:h-[248px] xl:w-[500px] xl:h-[276px] border-4 border-interaction shadow-custom'>
          <Slider/>
        </div>  
        <div className='flex flex-col justify-center items-center gap-3 md:flex-row md:gap-5'>        
          <Button onClick={handleRegistrationClick}>Registration</Button>
          <Button onClick={handleLoginClick}>Login</Button>
        </div>
      </div>
    </div>
  );
}

export default Home;