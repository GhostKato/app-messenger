'use client';

import React from 'react';
import UserUpdateForm from './UserUpdateForm';
import Button from './Button';
import { IoCloseOutline } from "react-icons/io5";
import { toggleModal } from '@/redux/modal/slice';
import { useDispatch } from 'react-redux';

const UserUpdate: React.FC = () => {

   const dispatch = useDispatch();  

  const handleUserUpdateToggle = () => {
          dispatch(toggleModal({ modalId: null, modalType: 'userUpdate' }));
      };

  return (
    <div className='fixed top-0 left-0 z-[100] w-screen h-screen flex justify-center items-center bg-bg'>
      <div className='bg-main relative w-[300px] md:w-[400px] h-[620px] md:h-[770px] rounded-lg flex flex-col gap-4 pt-[20px] pl-5 pr-5 border border-border shadow-custom'>
         <Button variant="close" onClick={handleUserUpdateToggle}>
                  <IoCloseOutline className="w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10" />
              </Button> 
          <UserUpdateForm/>        
        </div>
    </div>
   
  );
}

export default UserUpdate;