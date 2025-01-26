'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { RiLogoutCircleLine } from "react-icons/ri";


import Button from './Button';

const Footer: React.FC = () => {
  
    const router = useRouter();
    
const handleLogautClick = () => {
    router.push('/');
  };   
       
  return (
    <div className='md:w-[400px] h-[50px] h-[90px] md:h-[95px] xl:h-[100px] header-container flex justify-between items-center gap-5 p-5 bg-two shadow-custom border-three'>        

     
          <Button variant="logout" onClick={handleLogautClick}><RiLogoutCircleLine className='text-four group-hover:text-white w-[20px] h-[20px] md:w-[30px]  md:h-[30px]  xl:w-[40px]  xl:h-[40px]'/></Button>
      <p> © {new Date().getFullYear()} Ghost_Kato</p>    
      
    </div>
  );
}

export default Footer;