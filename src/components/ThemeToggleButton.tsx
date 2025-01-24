'use client';

import React from "react";
import { useThemeToggle } from "../hooks/themeToggle";

const ThemeToggleButton = () => {
  const { darkMode, toggleTheme } = useThemeToggle();

  return (
    <div className="absolute top-2 left-1">
      <label className="relative inline-block w-12 h-6 ">
        <input
          type="checkbox"
          id="toggle-night-mode"
          className="opacity-0 w-0 h-0"
          checked={darkMode}
          onChange={toggleTheme}
        />
        <span
          className={`toggle-slider absolute inset-0 cursor-pointer rounded-full transition-all duration-300 shadow-custom-inset 
            ${darkMode ? 'bg-zinc-700' : 'bg-zinc-400'}`}
        >
          <span
            className={`toggle-circle absolute top-1 left-1 w-4 h-4 rounded-full transition-all duration-300 shadow-custom 
              ${darkMode ? 'left-6 bg-green-500' : 'left-1 bg-yellow-400'}`}
          ></span>
        </span>
      </label>
    </div>
  );
};

export default ThemeToggleButton;
