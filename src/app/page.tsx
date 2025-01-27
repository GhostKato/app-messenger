'use client';
import Button from '@/components/Button';
import Image from 'next/image';
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
    <div className='flex flex-col justify-center items-center gap-10 bg-cool-gradient bg-[length:200%_200%] animate-gradient-move min-h-screen'>
      <h1 className='text-[30px] md:text-[50px]'>App messenger</h1>
      <div className='rounded-full overflow-hidden w-[250px]  md:w-[450px] xl:w-[500px] border-4 border-interaction shadow-custom'>
        <Image                    
                  src="/photo2.jpg"
                  alt="logo"                
                  width={500} 
                  height={500}
                  layout="intrinsic"
                  />
      </div>  
      <div className='flex flex-col justify-center items-center gap-3 md:flex-row md:gap-5'>        
        <Button onClick={handleRegistrationClick}>Registration</Button>
        <Button onClick={handleLoginClick}>Login</Button>
      </div>
    </div>
  );
}

export default Home;