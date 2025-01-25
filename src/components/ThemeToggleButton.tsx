'use client';

import React, { useEffect, useState } from 'react';

interface ThemeToggleProps {
  type: 'background' | 'hover';
  toggleColor: 'bg-two' | 'bg-four';
}

const ThemeToggleButton: React.FC<ThemeToggleProps> = ({ type, toggleColor }) => {
  const [active, setActive] = useState<boolean>(false);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem(type);
    if (savedTheme === 'active') {
      setActive(true);
      document.documentElement.classList.add(type); 
    } else {
      document.documentElement.classList.remove(type);
    }
  }, [type]);
  
  const toggleTheme = () => {
    setActive((prevState) => {
      const newActive = !prevState;

      if (newActive) {
        localStorage.setItem(type, 'active'); 
        document.documentElement.classList.add(type); 
      } else {
        localStorage.setItem(type, 'inactive');
        document.documentElement.classList.remove(type); 
      }

      return newActive;
    });
  };

  return (    
    <label className="relative inline-block w-12 h-6">
      <input
        type="checkbox"
        id={`toggle-${type}`}
        className="opacity-0 w-0 h-0"
        checked={active}
        onChange={toggleTheme}
      />
      <span
        className="toggle-slider absolute inset-0 cursor-pointer rounded-full transition-all duration-300 shadow-custom-inset bg-three border border-three hover:border-four"
      >
        <span
          className={`toggle-circle absolute top-1 left-1 w-4 h-4 rounded-full transition-all duration-300 shadow-custom 
            ${active ? 'left-6' : 'left-1'} ${toggleColor}`}
        ></span>
      </span>
    </label>   
  );
};

export default ThemeToggleButton;
