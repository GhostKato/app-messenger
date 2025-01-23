import React from 'react'; 
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (           
        <div className='message-layout'>
          <Sidebar />
          <Header />          
          {children}
          <Footer/>
      </div>              
  );
};

export default Layout;
