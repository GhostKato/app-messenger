'use client';
import React from 'react';
import SidebarItem from './SidebarItem';
import { usePathname } from 'next/navigation';
import Header from './Header';

export default function Sidebar() {
  
  const pathname = usePathname(); 
  
  const users = [
    { id: 1, name: 'User1', icon: '/icons/squares.svg' },
    { id: 2, name: 'User2', icon: '/icons/briefcase.svg' },
    { id: 3, name: 'User2', icon: '/icons/briefcase.svg' },
    { id: 4, name: 'User2', icon: '/icons/briefcase.svg' },
    { id: 5, name: 'User2', icon: '/icons/briefcase.svg' },
    { id: 6, name: 'User2', icon: '/icons/briefcase.svg' },
    { id: 7, name: 'User2', icon: '/icons/briefcase.svg' },
    { id: 8, name: 'User2', icon: '/icons/briefcase.svg' },    
  ];  

  return (    
      <aside className="sidebar-container bg-sidebar">
      <div className="flex flex-col h-full overflow-y-auto">
        <Header/>      
          <ul className="space-y-7">
            {users.map((user) => (
              <SidebarItem
                key={user.id}
                current={pathname === `/message/${user.id}`}
                pathname={`/message/${user.id}`}
                src={user.icon}
                alt={`${user.name} icon`}
              >
                {user.name}
              </SidebarItem>
            ))}
          </ul>
        </div>
      </aside>    
  );
}
