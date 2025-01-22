'use client';
import React from 'react';
import Image from 'next/image';
import SidebarItem from './SidebarItem';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  const showSidebar = pathname === '/' || pathname.startsWith('/message');

  const users = [
    { id: 1, name: 'User1', icon: '/icons/squares.svg' },
    { id: 2, name: 'User2', icon: '/icons/briefcase.svg' },
  ];

  return (
    showSidebar && (
      <aside className="fixed top-0 left-0 z-40 w-60 h-screen">
        <div className="flex flex-col h-full overflow-y-auto bg-gray-900">
          <Image
            className="py-8 mb-11 mx-auto"
            width={122}
            height={25}
            src="/icons/logo.svg"
            alt="logo"
          />
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
    )
  );
}
