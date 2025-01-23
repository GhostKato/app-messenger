import ThemeToggleButton from '@/components/ThemeToggleButton';
import React from 'react';
import Button from './Button';
import { toggleModal } from '@/redux/modal/slice';
import { useDispatch } from 'react-redux';

const UserMenu: React.FC = () => {

    const dispatch = useDispatch();

     const handleUserMenuToggle = () => {
        dispatch(toggleModal({ contactId: null, modalType: 'userMenu' }));
    };
    
  return (
      <div className='user-menu-container bg-menu'>
          <Button onClick={handleUserMenuToggle}>
    Close
          </Button>
           <ThemeToggleButton />
          <h1 className="text-3xl font-bold text-center p-8">UserMenu</h1>
          <div className="flex justify-center">            
        </div>
    </div>
  );
}

export default UserMenu;