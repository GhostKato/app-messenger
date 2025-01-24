import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';

export interface SidebarItemProps {
  current?: boolean;
  pathname: string;
  children: React.ReactNode;
  src: string;
  alt: string;
  status: string;
}

export default function SidebarItem({
  current,
  pathname, 
  children,
  src,
  alt,
  status
}: SidebarItemProps) {
  return (
    <li className='bg-red-500 w-[100%] rounded relative'>
      <Link
        href={pathname}
        className={clsx(
          'flex items-center mx-1 gap-3.5 justify-around',
          current &&
            'after:absolute after:top-0 after:left-0 after:h-full after:w-4 after:bg-purple-200 after:border-2 after:border-purple-200 after:rounded-sm before:absolute before:top-0 before:right-0 before:h-full before:w-4 before:bg-purple-200 before:border-2 before:border-purple-200 before:rounded-sm',
        )}
      >
        <Image src={src} alt={alt} width={50} height={50} />
        <span className="font-medium text-zinc-50">{children}</span>
        <span className="font-medium text-zinc-50">{status}</span>
      </Link>
    </li>
  );
}
