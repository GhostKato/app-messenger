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
    <li className={clsx(
          'flex border: border-three hover:border-four h-[60px] w-[100%] rounded-full relative border-2 shadow-custom-inset',
          current &&
            'bg-four border: border-four',
        )}>
      <Link
        href={pathname}
        className={clsx(
          'flex justify-around items-center mx-1 gap-3.5 w-[100%]',
          current &&
            'after:absolute after:top-5 after:left-1 after:h-4 after:w-4 after:bg-two after:border-two after:border-2  after:rounded-full ',
        )}
      >
        <div className='rounded-full overflow-hidden shadow-custom'><Image src={src} alt={alt} width={50} height={50} /></div>
        <span className="font-medium text-zinc-50">{children}</span>
        <span className="font-medium text-zinc-50">{status}</span>
      </Link>
    </li>
  );
}
