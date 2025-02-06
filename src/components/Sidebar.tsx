'use client';
import React, { useEffect } from 'react';
import SidebarItem from './SidebarItem';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import { fetchUsers } from '../redux/user/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredUsers } from '../redux/filters/selectors';
import { AppDispatch } from '../redux/store';
import { selectUser } from '@/redux/auth/selectors';

export default function Sidebar() {
  const dispatch = useDispatch<AppDispatch>(); 
  const pathname = usePathname(); 

  const filteredUsers = useSelector(selectFilteredUsers);
 

  useEffect(() => {
    dispatch(fetchUsers()); 
  }, [dispatch]);

  if (!filteredUsers || !Array.isArray(filteredUsers)) {
    return <p>No users.</p>;
  }

  return (
    <aside className="sidebar-container bg-main h-screen">
      <div className="flex flex-col h-full">
        <Header />
        <ul className="flex flex-col items-center gap-[13px] pl-5 pb-[10px] pr-5 pt-[10px] overflow-auto flex-grow scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-black">
          {filteredUsers.map((user) => (
            <SidebarItem
              key={user._id}
              current={pathname === `/message/${user._id}`}
              pathname={`/message/${user._id}`}
              src={user.photo}
              alt={`${user.name} icon`}
              status="online"
            >
              {user.name}
            </SidebarItem>
          ))}
        </ul>
        <Footer />
      </div>
    </aside>
  );
}
