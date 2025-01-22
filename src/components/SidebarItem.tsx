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
}

export default function SidebarItem({
  current,
  pathname, 
  children,
  src,
  alt,
}: SidebarItemProps) {
  return (
    <li>
      <Link
        href={pathname}
        className={clsx(
          'flex items-center h-9 mx-1 gap-3.5',
          current &&
            'after:h-full after:ml-auto after:border-2 after:border-purple-200 after:rounded-sm',
        )}
      >
        <Image src={src} alt={alt} width={20} height={20} />
        <span className="font-medium text-zinc-50">{children}</span>
      </Link>
    </li>
  );
}
