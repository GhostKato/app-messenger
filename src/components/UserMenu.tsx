import ThemeToggleButton from '@/components/ThemeToggleButton';
import React from 'react';
import Button from './Button';
import { toggleModal } from '@/redux/modal/slice';
import { useDispatch } from 'react-redux';
import { IoCloseOutline } from "react-icons/io5";
import UserMenuItem from './UserMenuItem';

const UserMenu: React.FC = () => {
    const dispatch = useDispatch();

    const handleUserMenuToggle = () => {
        dispatch(toggleModal({ contactId: null, modalType: 'userMenu' }));
    };

    return (
        <div className="user-menu-container bg-two w-[200px] h-[200px] rounded-lg shadow-lg flex flex-col gap-4 pt-[50px] pl-5 pr-5">
            <Button variant="close" onClick={handleUserMenuToggle}>
                <IoCloseOutline className="w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10" />
            </Button>
            <ThemeToggleButton />
            <UserMenuItem pathname="/message/">
                Edit user
        </UserMenuItem>
        <UserMenuItem pathname="/message/">
                Logaut
            </UserMenuItem>
        </div>
    );
};

export default UserMenu;
