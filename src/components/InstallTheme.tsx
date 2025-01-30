'use client';

import { useEffect } from 'react';

const InstallTheme = () => {
  // Масив типів тем
  const themeTypes: ('sidebar' | 'interaction' | 'receiving' | 'image')[] = ['sidebar', 'interaction', 'receiving', 'image'];

  useEffect(() => {
    // Перебираємо всі типи тем і застосовуємо їх
    themeTypes.forEach((type) => {
      const savedTheme = localStorage.getItem(type); // Отримуємо збережену тему з localStorage
      if (savedTheme) {
        document.documentElement.setAttribute(`data-${type}-theme`, savedTheme); // Якщо є тема, встановлюємо її
      } else {
        document.documentElement.removeAttribute(`data-${type}-theme`); // Якщо немає, видаляємо атрибут
      }
    });
  }, []); // Виконується тільки один раз при монтуванні компонента

  return null; // Компонент нічого не рендерить, тільки виконує побічний ефект
};

export default InstallTheme;
