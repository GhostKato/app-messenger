'use client';
import Button from '@/components/Button';
import { selectUser } from '@/redux/auth/selectors';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

const WelcomeLogin: React.FC = () => {

  const user = useSelector(selectUser);
  const router = useRouter();

  const handleMessageClick = () => {    
    router.push('/message');
  };  

  return (    
      <div className='flex flex-col justify-center items-center gap-10  rounded-[20px] p-10 bg-form shadow-custom'>
      <h1 className='text-[30px] md:text-[50px] text-center'>Welcome,<br/>{user.name}</h1>
        <div className='flex justify-center items-center rounded-full overflow-hidden w-[136px] h-[136px] md:w-[248px] md:h-[248px] xl:w-[276px] xl:h-[276px] border-4 border-interaction shadow-custom'>
          <Image                    
            src={user.photo || '/path/to/default/image.jpg'}
            alt="logo"                    
            width={500} 
            height={500}          
                    />  
        </div>  
        <div className='flex flex-col justify-center items-center gap-3 md:flex-row md:gap-5'>     
          <Button onClick={handleMessageClick}>Go to start</Button>
        </div>
      </div>    
  );
}

export default WelcomeLogin;