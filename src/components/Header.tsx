'use client'
import { toggleModal } from '@/redux/modal/slice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import UserMenu from './UserMenu';
import { selectUserMenu } from '@/redux/modal/selectors';
import SearchBox from './SearchBox';

const Header: React.FC = () => {
  
  const dispatch = useDispatch();

  const isOpenUserMenu = useSelector(selectUserMenu);    
      
  const handleUserMenuToggle = () => {
    dispatch(toggleModal({ contactId: null, modalType: 'userMenu' }));
  };  

  return (
    <div className='header-container flex justify-around items-center gap-5 p-5'>

       {isOpenUserMenu && <UserMenu/>}      

      <div className="rounded-[8px] overflow-hidden w-[50px]  md:w-[55px] xl:w-[60px]">
        <Image                    
          src="/photo.jpg"
          alt="logo"
          onClick={handleUserMenuToggle}
          width={200} 
          height={200}
          layout="intrinsic"
          />  
      </div>
 
      <SearchBox/>       
      
    </div>
  );
}

export default Header;