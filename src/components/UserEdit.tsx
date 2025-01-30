'use client';

import React from 'react';
import UserEditForm from './UserEditForm';
import Button from './Button';
import { IoCloseOutline } from "react-icons/io5";
import { toggleModal } from '@/redux/modal/slice';
import { useDispatch } from 'react-redux';

const UserEdit: React.FC = () => {

   const dispatch = useDispatch();  

  const handleUserEditToggle = () => {
          dispatch(toggleModal({ contactId: null, modalType: 'userEdit' }));
      };

  return (
    <div className='fixed top-0 left-0 z-[100] w-screen h-screen flex justify-center items-center bg-bg'>
      <div className='bg-main relative w-[300px] md:w-[400px] h-[440px] rounded-lg flex flex-col gap-4 pt-[50px] pl-5 pr-5 border border-border shadow-custom'>
         <Button variant="close" onClick={handleUserEditToggle}>
                  <IoCloseOutline className="w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10" />
              </Button> 
          <UserEditForm/>        
        </div>
    </div>
   
  );
}

export default UserEdit;