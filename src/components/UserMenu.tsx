import ThemeSelect from '@/components/ThemeSelect';
import React from 'react';
import Button from './Button';
import { toggleModal } from '@/redux/modal/slice';
import { useDispatch } from 'react-redux';
import { IoCloseOutline } from "react-icons/io5";

const UserMenu: React.FC = () => {
    const dispatch = useDispatch();

    const handleUserMenuToggle = () => {
        dispatch(toggleModal({ modalId: null, modalType: 'userMenu' }));
    };

    const handleUpdateUserToggle = () => {
        dispatch(toggleModal({ modalId: null, modalType: 'userUpdate' }));
        dispatch(toggleModal({ modalId: null, modalType: 'userMenu' }));
    };

    return (
        <div className="absolute flex flex-col items-center top-[20px] left-[20px] z-[100] bg-main w-[200px] h-[470px] rounded-lg gap-4 pt-[50px] pl-5 pr-5 border border-border shadow-custom">
            <Button variant="close" onClick={handleUserMenuToggle}>
                <IoCloseOutline className="w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10" />
            </Button>            
            <div className="flex flex-col gap-2">               
                <ThemeSelect type="sidebar" />
                <ThemeSelect type="receiving" />
                <ThemeSelect type="interaction" />
                <ThemeSelect type="image" />
            </div>
            <Button onClick={handleUpdateUserToggle}>
               Update user
            </Button>     
        </div>
    );
};

export default UserMenu;
