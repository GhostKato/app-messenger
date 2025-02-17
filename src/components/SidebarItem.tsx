import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';

type SidebarItemProps = {
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
          'flex border: border-border hover:border-interaction h-[60px] w-[100%] rounded-full relative border-2 shadow-custom-inset',
          current &&
            'bg-interaction border: border-interaction',
        )}>
      <Link
        href={pathname}
        className={clsx(
          'flex justify-between items-center mx-1 gap-3.0 w-[100%] px-[15px]',
          current &&
            'after:absolute after:top-4 after:left-0 after:h-4 after:w-4 after:bg-main after:border-main after:border-2  after:rounded-full ',
        )}
      >
        <div className='rounded-full w-[50px] h-[50px] overflow-hidden shadow-custom'>
          <Image
            className="object-contain"
            src={src}
            alt={alt}
            width={50} 
            height={50}            
          />
        </div>
        <span className="text-xl md:text-2xl text-zinc-50">{children}</span>
        <span className={`font-medium ${status === 'online' ? 'text-green-700' : 'text-gray-800'}`}>{status}</span>
      </Link>
    </li>
  );
}
