'use client';
import React from 'react';
import LoginForm from '@/components/LoginForm';
import FormMenu from '@/components/FormMenu';

const Login: React.FC = () => {  

  return (
    <div className='flex justify-center items-center w-screen bg-cool-gradient bg-[length:200%_200%] animate-gradient-move min-h-screen'>
     <div className='flex flex-col justify-center items-center gap-10  rounded-[20px] p-10 bg-form shadow-custom'>
         <FormMenu/>
        <LoginForm/>        
     </div>
    </div>
  );
}

export default Login;