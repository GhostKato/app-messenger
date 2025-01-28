'use client';
import React from 'react';
import SidebarItem from './SidebarItem';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function Sidebar() {
  
  const pathname = usePathname(); 
  
  const users = [
  { id: 1, name: 'Bram Cohen', icon: '/users/photo.jpg', status: 'offline' },
  { id: 2, name: 'Brendan Eich', icon: '/users/photo2.jpg', status: 'offline' },
  { id: 3, name: 'Donald Knuth', icon: '/users/photo3.jpg', status: 'online' },
  { id: 4, name: 'Elon Musk', icon: '/users/photo4.jpg', status: 'online' },
  { id: 5, name: 'Jeffrey Preston', icon: '/users/photo5.jpg', status: 'offline' },
  { id: 6, name: 'John D. Carmack', icon: '/users/photo6.jpg', status: 'online' },
  { id: 7, name: 'Linus Torvalds', icon: '/users/photo7.jpg', status: 'online' },
  { id: 8, name: 'Mark Zuckerberg', icon: '/users/photo8.jpg', status: 'offline' },
  { id: 9, name: 'Pichai Sundararajan', icon: '/users/photo9.jpg', status: 'online' },
  { id: 10, name: 'Sir Timothy John', icon: '/users/photo10.jpg', status: 'offline' },
  { id: 11, name: 'Solomon Hykes', icon: '/users/photo11.jpg', status: 'offline' },
  { id: 12, name: 'Tim Cook', icon: '/users/photo12.jpg', status: 'online' },
];  

  return (    
    <aside className="sidebar-container bg-sidebar h-screen">      
  <div className="flex flex-col h-full">
    <Header />
    <ul className="flex flex-col items-center gap-[13px] pl-5 pb-[10px] pr-5 pt-[10px] overflow-auto flex-grow scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-black">
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
