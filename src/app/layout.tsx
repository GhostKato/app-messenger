import React from 'react'; 
import '../../src/scss/main.scss';
import { Roboto } from 'next/font/google';
import { ScreenSizeProvider } from "../contexts/screenSizeContext";
import ReduxProvider from '@/components/ReduxProvider';
import InstallTheme from '@/components/InstallTheme';
import Refresh from '@/components/Refresh';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'App messenger',
  description: 'This is an application for communication.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.example.com/',
    title: 'App messenger',
    description: 'This is an application for communication.',
    site_name: 'App messenger',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
     <ReduxProvider>
      <ScreenSizeProvider>
        <Refresh/>
        <InstallTheme/>
    <html lang="en" className={roboto.className}>
        <body>                
          {children}
        </body>
      </html>
      </ScreenSizeProvider>
      </ReduxProvider>
  );
};

export default RootLayout;
