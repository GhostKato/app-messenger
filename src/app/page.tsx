import ThemeToggleButton from '@/components/ThemeToggleButton';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--bg-color)', 
        color: 'var(--text-color)',           
      }}
    >
      <h1 className="text-3xl font-bold text-center p-8">
        Home page
      </h1>
      <div className="flex justify-center">
        <ThemeToggleButton />
      </div>
    </div>
  );
}

export default Home;