'use client'
import ThemeToggleButton from '@/components/ThemeToggleButton';
import { toggleModal } from '@/redux/modal/slice';
import React from 'react';
import { useDispatch } from 'react-redux';
import Button from './Button';
import { useScreenSizeContext } from "../contexts/screenSizeContext";
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  
  const dispatch = useDispatch();
  const { screenSize } = useScreenSizeContext();

  const pathname = usePathname(); 
    
    const showHeader = pathname === '/' || pathname.startsWith('/message');
  
    if (!showHeader) {
      return null;
    }
  
  const handleSidebarToggle = () => {
    dispatch(toggleModal({ contactId: null, modalType: 'sidebar' }));
  };

  return (
    <div className='header-container'>
      {screenSize === 'mobil' && (
  <Button onClick={handleSidebarToggle}>
    Open
  </Button>
)}
      <h1 className="text-3xl font-bold text-center p-8">
        Header
      </h1>
      <div className="flex justify-center">
        <ThemeToggleButton />     
        </div>
    </div>
  );
}

export default Header;