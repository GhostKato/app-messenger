import React from 'react';

const Footer: React.FC = () => {
  return (
    <div      
      style={{
        backgroundColor: 'var(--bg-color)', 
        color: 'var(--text-color)',           
      }}
    >
      <h1 className="text-3xl font-bold text-center p-8">
        Footer
      </h1>
      <div className="flex justify-center">             
        </div>
    </div>
  );
}

export default Footer;