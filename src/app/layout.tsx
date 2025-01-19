import React from 'react';
import './globals.css';

export const metadata = {
  title: 'App messenger',
  description: 'This is the root layout.',
  icons: {
    icon: '/favicon.png',    
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body       
      >
        {children}
      </body>
    </html>
  );
};
export default RootLayout;

