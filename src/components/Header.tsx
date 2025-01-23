'use client'
import { toggleModal } from '@/redux/modal/slice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import Image from 'next/image';
import UserMenu from './UserMenu';
import { selectUserMenu } from '@/redux/modal/selectors';

const Header: React.FC = () => {
  
  const dispatch = useDispatch();

  const isOpenUserMenu = useSelector(selectUserMenu); 
  
      
  const handleUserMenuToggle = () => {
    dispatch(toggleModal({ contactId: null, modalType: 'userMenu' }));
  };

  return (
    <div className='header-container'>

       {isOpenUserMenu && <UserMenu/>}      

      <Image
        className="py-8 mb-11 mx-auto"
          width={122}
          height={25}
          src="/icons/logo.svg"
          alt="logo"
        />  
 
      <h1 className="text-3xl font-bold text-center p-8">
        Header
      </h1>

       <Button onClick={handleUserMenuToggle}>
    Menu
  </Button>
      
    </div>
  );
}

export default Header;