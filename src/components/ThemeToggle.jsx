import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme} 
      className="
        fixed
        top-1
        left-1
        z-50
        bg-transparent
        rounded-full
        hover:bg-gray-300
        dark:hover:bg-gray-600
        transition-colors
        shadow-md
      "
      aria-label={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {theme === 'dark' ? (
        <Sun className="w-6 h-6 text-yellow-500" /> 
      ) : (
        <Moon className="w-6 h-6 text-indigo-600" />
      )}
    </button>
  );
};

