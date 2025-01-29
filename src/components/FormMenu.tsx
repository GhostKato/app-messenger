'use client';

import React from 'react';
import FormMenuItem from './FormMenuItem';
import { usePathname } from 'next/navigation';

const menuItems = [
  { path: '/', label: 'Welcome' },
  { path: '/registration', label: 'Registration' },
  { path: '/login', label: 'Login' },
];

const FormMenu: React.FC = () => {
  const pathname = usePathname();

  return (
    <ul className="flex gap-[20px]">
      {menuItems.map(({ path, label }) => (
        <FormMenuItem key={path} current={pathname === path} pathname={path}>
          {label}
        </FormMenuItem>
      ))}
    </ul>
  );
};

export default FormMenu;
