'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { RiLogoutCircleLine } from "react-icons/ri";
import { logOut } from '../redux/auth/operations';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';

const Footer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    
  const handleLogoutClick = async () => {
  await dispatch(logOut()); 
  router.push('/');           
};   
       
  return (
    <div className='md:w-[400px]  header-container flex justify-between items-center gap-5 p-2 md:p-5 bg-two shadow-custom border-border'>        

     
          <Button variant="logout" onClick={handleLogoutClick}><RiLogoutCircleLine className='text-interaction group-hover:text-white w-[20px] h-[20px] md:w-[30px]  md:h-[30px]  xl:w-[40px]  xl:h-[40px]'/></Button>
      <p> © {new Date().getFullYear()} Ghost_Kato</p>    
      
    </div>
  );
}

export default Footer;