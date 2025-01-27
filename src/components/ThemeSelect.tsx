'use client';

import React from 'react';
import { Formik, Field, FormikHelpers } from 'formik';

// Типи варіантів для вибору
interface ThemeSelectProps {
  type: 'sidebar' | 'interaction' | 'receiving'; // Тип для зміни sidebar, interaction чи receiving
}

const handleThemeChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  setFieldValue: FormikHelpers<{ theme: string }>['setFieldValue'], // Вказуємо правильний тип
  type: 'sidebar' | 'interaction' | 'receiving'
) => {
  const newValue = e.target.value;
  setFieldValue('theme', newValue);
  if (newValue === '') {
    document.documentElement.removeAttribute(`data-${type}-theme`);
    localStorage.removeItem(type);
  } else {
    document.documentElement.setAttribute(`data-${type}-theme`, newValue);
    localStorage.setItem(type, newValue);
  }
};

const ThemeSelect: React.FC<ThemeSelectProps> = ({ type }) => {
  // Варіанти sidebar, interaction та receiving
  const themeOptions = {
    sidebar: [
      { value: '', label: 'Midnight Blue' },
      { value: 'storm-gray', label: 'Storm Gray' },
      { value: 'zest-orange', label: 'Zest Orange' },
      { value: 'garnet-red', label: 'Garnet Red' },
    ],
    interaction: [
      { value: '', label: 'Pulse Red' },
      { value: 'astral-purple', label: 'Astral Purple' },
      { value: 'lightning-yellow', label: 'Lightning Yellow' },
      { value: 'velocity-green', label: 'Velocity Green' },
    ],
    receiving: [
      { value: '', label: 'Purple' },
      { value: 'green', label: 'Green' },
    ],
  };  

  return (
    <Formik
      initialValues={{ theme: localStorage.getItem(type) || '' }}
      onSubmit={() => {}}
    >
      {({ setFieldValue }) => (
        <div className="theme-select flex flex-col justify-center items-center">
          <label htmlFor={type} className="block mb-2">
            {type === 'sidebar'
              ? 'Sidebar color'
              : type === 'interaction'
              ? 'Interaction color'
              : 'Receiving color'}
          </label>
          <Field
            as="select"
            id={type}
            name="theme"
            className="rounded-full  w-[140px] p-[5px] text-center border-2 border-border hover:border-interaction"
            onChange={(e) => handleThemeChange(e, setFieldValue, type)}
          >
            {themeOptions[type].map((option) => (
              <option key={option.value} value={option.value} className='bg-sidebar border-2'>
                {option.label}
              </option>
            ))}
          </Field>
        </div>
      )}
    </Formik>
  );
};

export default ThemeSelect;
