'use client';
import React from 'react';
import SidebarItem from './SidebarItem';
import { usePathname } from 'next/navigation';
import Header from './Header';

export default function Sidebar() {
  
  const pathname = usePathname(); 
  
  const users = [
    { id: 1, name: 'Mark Deimon', icon: '/photo.jpg', status:'online' },
    { id: 2, name: 'Mark Deimon', icon: '/photo.jpg', status:'ofline' },
    { id: 3, name: 'Mark Deimon', icon: '/photo.jpg', status:'online' },
    { id: 4, name: 'Mark Deimon', icon: '/photo.jpg', status:'online' },
    { id: 5, name: 'Mark Deimon', icon: '/photo.jpg', status:'ofline' },
    { id: 6, name: 'Mark Deimon', icon: '/photo.jpg', status:'online' },
    { id: 7, name: 'Mark Deimon', icon: '/photo.jpg', status:'online' },
    { id: 8, name: 'Mark Deimon', icon: '/photo.jpg', status: 'online' },
    { id: 9, name: 'Mark Deimon', icon: '/photo.jpg', status:'ofline' },
    { id: 10, name: 'Mark Deimon', icon: '/photo.jpg', status:'online' },
    { id: 11, name: 'Mark Deimon', icon: '/photo.jpg', status:'online' },
    { id: 12, name: 'Mark Deimon', icon: '/photo.jpg', status:'online' }, 
  ];  

  return (    
      <aside className="sidebar-container bg-two overflow-auto">
      <div className="flex flex-col h-full">
        <Header/>      
          <ul className="flex flex-col items-center gap-5 pl-5 pr-5">
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
        </div>
      </aside>    
  );
}
