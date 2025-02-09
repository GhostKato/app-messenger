'use client'
import { toggleModal } from '@/redux/modal/slice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import UserMenu from './UserMenu';
import { selectUserUpdate, selectUserMenu } from '@/redux/modal/selectors';
import { selectUser } from '@/redux/auth/selectors';
import SearchBox from './SearchBox';
import UserUpdate from './UserUpdate';
import { BASE_PHOTO_URL } from '../constants/сonstants';

const Header: React.FC = () => {
  
  const dispatch = useDispatch();

  const isOpenUserMenu = useSelector(selectUserMenu);
  const isOpenUserEdit = useSelector(selectUserUpdate);
  const user = useSelector(selectUser);
  

  const userPhoto = user?.photo || BASE_PHOTO_URL;
      
  const handleUserMenuToggle = () => {
    dispatch(toggleModal({ modalId: null, modalType: 'userMenu' }));
  };  

  return (
    <div className='md:w-[400px] flex justify-around items-center gap-5 p-2 md:p-5 shadow-custom'>

      {isOpenUserMenu && <UserMenu />}
       {isOpenUserEdit && <UserUpdate/>} 

      <div className="rounded-full overflow-hidden w-[45px]  md:w-[55px] xl:w-[60px] shadow-custom border-2 border-border hover:border-interaction">
        <Image                    
          src={userPhoto}
          alt="logo"
          onClick={handleUserMenuToggle}
          width={200} 
          height={200}          
          />  
      </div>
 
      <SearchBox/>       
      
    </div>
  );
}

export default Header;