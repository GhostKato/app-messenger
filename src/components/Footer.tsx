'use client';
import { usePathname } from 'next/navigation';
import React from 'react';

const Footer: React.FC = () => {

  const pathname = usePathname(); 
  
  const showFooter = pathname === '/' || pathname.startsWith('/message');

  if (!showFooter) {
    return null;
  }
  
  return (
    <div className='footer-container bg-footer'>
      <h1 className="text-3xl font-bold text-center p-8">
        Footer
      </h1>
      <div className="flex justify-center">             
        </div>
    </div>
  );
}

export default Footer;