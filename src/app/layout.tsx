import React from 'react'; 
import '../../src/scss/main.scss';
import { Roboto } from 'next/font/google';
import { ScreenSizeProvider } from "../contexts/screenSizeContext";
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReduxProvider from '@/components/ReduxProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'App messenger',
  description: 'This is the root layout.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.example.com/',
    title: 'App messenger',
    description: 'This is the root layout.',
    site_name: 'App messenger',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
     <ReduxProvider>
    <ScreenSizeProvider>
    <html lang="en" className={roboto.className}>
        <body>
          <Sidebar />
          <Header />          
          {children}
          <Footer/>
      </body>
      </html>
      </ScreenSizeProvider>
      </ReduxProvider>
  );
};

export default RootLayout;
