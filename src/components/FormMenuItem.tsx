import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type FormMenuProps = {
  current?: boolean;
  pathname: string;
  children: React.ReactNode;
}

const FormMenuItem: React.FC<FormMenuProps> = ({ current, pathname, children }) => {
  const listItemClasses = clsx(
    'flex justify-center items-center h-[30px] relative text-lg md:text-2xl hover:text-interaction ',
    current && 'text-interaction after:absolute after:bottom-[-6px] after:left-0 after:h-1 after:w-full after:bg-sidebar after:border-interaction after:border-2 after:rounded-full'
  );

  return (
    <li className='relative'>
      <Link href={pathname} className={listItemClasses}>
        {children}
      </Link>
    </li>
  );
};

export default FormMenuItem;
