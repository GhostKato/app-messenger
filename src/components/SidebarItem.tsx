import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotification } from '@/redux/messages/selectors';
import { NotificationType } from '@/types/notificationTypes';
import { deleteNotifications } from '@/redux/messages/operations';
import { AppDispatch } from '@/redux/store';

type SidebarItemProps = {
  userId: string | null;
  current?: boolean;
  pathname: string;
  children: React.ReactNode;
  src: string;
  alt: string;
  status: string;
}

export default function SidebarItem({
  userId,
  current,
  pathname, 
  children,
  src,
  alt,
  status
}: SidebarItemProps) {

  const dispatch = useDispatch<AppDispatch>();
  const notification = useSelector(selectNotification) as NotificationType[];
  const notificationFilter = notification.filter((ntf) => ntf.fromId === userId);  
  const notificationIds = notificationFilter.map((ntf) => ntf._id);
  const notificationCount = notificationFilter.length;

   const handleClick = () => {
  if (notificationIds.length > 0) {      
    dispatch(deleteNotifications({ ids: notificationIds })); 
  }
};

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
          status === 'online' &&
            'after:absolute after:top-0 after:left-[55px] after:h-4 after:w-4 after:bg-green-700 after:border-green-700 after:border-2  after:shadow-custom after:rounded-full ',
        )}
        onClick={handleClick}
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
        <span className={clsx(
  "font-medium rounded-full p-2 shadow-custom-inset",
  status === "online" ? "text-green-700" : "text-red-700",
  current && "bg-main border border-interaction"
)}>
  {notificationCount > 0 ? notificationCount : status}
</span>
      </Link>
    </li>
  );
}
