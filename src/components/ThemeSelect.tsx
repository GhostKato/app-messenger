'use client';

import React, { useState, useEffect } from 'react';

// Типи варіантів для вибору
interface ThemeSelectProps {
  type: 'sidebar' | 'interaction'; // Тип для зміни sidebar або interaction
}

const ThemeSelect: React.FC<ThemeSelectProps> = ({ type }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  // Варіанти sidebar та interaction
  const themeOptions = {
    sidebar: [
      { value: '', label: 'Midnight Blue' },  // Пункт для стандартного sidebar
      { value: 'storm-gray', label: 'Storm Gray' },
      { value: 'zest-orange', label: 'Zest Orange' },
      { value: 'garnet-red', label: 'Garnet Red' },
    ],
    interaction: [
      { value: '', label: 'Pulse Red' }, // Пункт для стандартного interaction
      { value: 'astral-purple', label: 'Astral Purple' },
      { value: 'lightning-yellow', label: 'Lightning Yellow' },
      { value: 'velocity-green', label: 'Velocity Green' },
    ],
  };

  // Логіка для встановлення теми на основі збереженого значення
  useEffect(() => {
    const savedTheme = localStorage.getItem(type);
    if (savedTheme) {
      setSelectedOption(savedTheme);
      document.documentElement.setAttribute(`data-${type}-theme`, savedTheme);
    } else {
      // Якщо немає збереженого значення, використовується стандартне
      setSelectedOption('');
      document.documentElement.removeAttribute(`data-${type}-theme`);
    }
  }, [type]);

  // Обробник зміни вибору
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedOption(newValue);
    if (newValue === '') {
      document.documentElement.removeAttribute(`data-${type}-theme`); // Повернення до значень :root
      localStorage.removeItem(type); // Видалення збереженого значення з localStorage
    } else {
      localStorage.setItem(type, newValue); // Збереження вибору в localStorage
      document.documentElement.setAttribute(`data-${type}-theme`, newValue); // Зміна атрибута data- на html
    }
  };

  return (
    <div className="theme-select">
      <label htmlFor={type}>{type === 'sidebar' ? 'Sidebar color' : 'Interaction color'}</label>
      <select
        id={type}
        value={selectedOption}
        onChange={handleChange}
        className="rounded-full p-2 border border-border"
      >
        {themeOptions[type].map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelect;
