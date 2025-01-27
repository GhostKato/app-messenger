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
    <li className='w-[100%] list-none rounded-full border-2 border: border-border hover:border-interaction focus:border-interaction shadow-custom-inset'>
      <Link
        href={pathname}
        className='flex items-center justify-around h-9 mx-1 gap-3.5'>        
        <div className="font-medium text-zinc-50">{children}</div>        
      </Link>
    </li>
  );
}
