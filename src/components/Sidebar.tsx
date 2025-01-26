'use client';
import React from 'react';
import SidebarItem from './SidebarItem';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function Sidebar() {
  
  const pathname = usePathname(); 
  
  const users = [
    { id: 1, name: 'William Murray', icon: '/photo.jpg', status:'online' },
    { id: 2, name: 'William Murray', icon: '/photo.jpg', status:'ofline' },
    { id: 3, name: 'William Murray', icon: '/photo.jpg', status:'online' },
    { id: 4, name: 'William Murray', icon: '/photo.jpg', status:'online' },
    { id: 5, name: 'William Murray', icon: '/photo.jpg', status:'ofline' },
    { id: 6, name: 'William Murray', icon: '/photo.jpg', status:'online' },
    { id: 7, name: 'William Murray', icon: '/photo.jpg', status:'online' },
    { id: 8, name: 'William Murray', icon: '/photo.jpg', status: 'online' },
    { id: 9, name: 'William Murray', icon: '/photo.jpg', status:'ofline' },
    { id: 10, name: 'William Murray', icon: '/photo.jpg', status:'online' },
    { id: 11, name: 'William Murray', icon: '/photo.jpg', status:'online' },
    { id: 12, name: 'William Murray', icon: '/photo.jpg', status:'online' }, 
  ];  

  return (    
      <aside className="sidebar-container bg-two h-screen">
  <div className="flex flex-col h-full">
    <Header />
    <ul className="flex flex-col items-center gap-[13px] pl-5 pb-[10px] pr-5 pt-[10px] overflow-auto flex-grow">
      {users.map((user) => (
        <SidebarItem
          key={user.id}
          current={pathname === `/message/${user.id}`}
          pathname={`/message/${user.id}`}
          src={user.icon}
          alt={`${user.name} icon`}
          status={user.status}
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
