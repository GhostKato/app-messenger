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
          'border: border-gray hover:bg-hover w-[100%] rounded-full relative border-2 hover:border-red shadow-custom-inset',
          current &&
            'bg-hover border: border-red',
        )}>
      <Link
        href={pathname}
        className={clsx(
          'flex items-center mx-1 gap-3.5 justify-around',
          current &&
            'after:absolute after:top-4 after:left-1 after:h-4 after:w-4 after:bg-one after:border-red after:border-2  after:rounded-full ',
        )}
      >
        <div className='rounded-full overflow-hidden shadow-custom'><Image src={src} alt={alt} width={50} height={50} /></div>
        <span className="font-medium text-zinc-50">{children}</span>
        <span className="font-medium text-zinc-50">{status}</span>
      </Link>
    </li>
  );
}
