'use client';
import React, { useEffect } from 'react';
import SidebarItem from './SidebarItem';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import { getUsers } from '../redux/user/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredUsers } from '../redux/filters/selectors';
import { AppDispatch } from '../redux/store';
import { BASE_PHOTO_URL } from '../constants/сonstants';
import { selectIsRefreshing } from '@/redux/auth/selectors';  
import { getNotifications } from '@/redux/messages/operations';

export default function Sidebar() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch<AppDispatch>(); 
  const pathname = usePathname(); 

  const filteredUsers = useSelector(selectFilteredUsers);  

  useEffect(() => {
    if (!isRefreshing) {
      dispatch(getUsers());
      dispatch(getNotifications());
    }
  }, [isRefreshing, dispatch]); 

  if (!filteredUsers || !Array.isArray(filteredUsers)) {
    return <p>No users.</p>;
  }

  return (
    <aside className="sidebar-container bg-main h-screen">
      <div className="flex flex-col h-full">
        <Header />
        <ul className="flex flex-col items-center gap-[13px] pl-5 pb-[10px] pr-5 pt-[10px] overflow-auto flex-grow scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-black">
          {filteredUsers.map((user) => {            
            
            return (
              <SidebarItem
                key={user._id}
                userId={user._id}
                current={pathname === `/message/${user._id}`}
                pathname={`/message/${user._id}`}
                src={user.photo || BASE_PHOTO_URL}
                alt={`${user.name} icon`}
                status={user.status} 
              >
                {user.name}
              </SidebarItem>
            );
          })}
        </ul>
        <Footer />
      </div>
    </aside>
  );
}
