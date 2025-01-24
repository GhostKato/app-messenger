import React from 'react';
import Link from 'next/link';

export interface UserMenuProps { 
  pathname: string;
  children: React.ReactNode;  
}

export default function UserMenuItem({  
  pathname, 
  children, 
 
}:  UserMenuProps) {
  return (
    <li className='bg-red-500 w-[100%] list-none rounded'>
      <Link
        href={pathname}
        className='flex items-center justify-around h-9 mx-1 gap-3.5'>        
        <div className="font-medium text-zinc-50">{children}</div>        
      </Link>
    </li>
  );
}
