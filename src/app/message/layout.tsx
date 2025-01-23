'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { useScreenSizeContext } from '../../contexts/screenSizeContext';
import { usePathname } from 'next/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { screenSize } = useScreenSizeContext();
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isMobile = screenSize === 'mobil';
  const isMessagePage = pathname === '/message';
  const isMessageDetailPage = pathname.startsWith('/message/');
  
  if (!isHydrated) return null;

  return (
    <div className="message-layout">
      {isMobile ? (
        <>
          {isMessagePage && <Sidebar />}
          {isMessageDetailPage && children}
        </>
      ) : (
        <>
          <Sidebar />
          {children}
        </>
      )}
    </div>
  );
};

export default Layout;
