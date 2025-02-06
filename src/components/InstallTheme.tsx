'use client';

import { useEffect } from 'react';

const InstallTheme = () => {
  
  const themeTypes: ('sidebar' | 'interaction' | 'receiving' | 'image')[] = ['sidebar', 'interaction', 'receiving', 'image'];

  useEffect(() => {
    
    themeTypes.forEach((type) => {
      const savedTheme = localStorage.getItem(type); 
      if (savedTheme) {
        document.documentElement.setAttribute(`data-${type}-theme`, savedTheme); 
      } else {
        document.documentElement.removeAttribute(`data-${type}-theme`); 
      }
    });
  }, []); 

  return null; 
};

export default InstallTheme;
