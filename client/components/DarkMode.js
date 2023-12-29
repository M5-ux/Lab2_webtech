import React from 'react';
import { useTheme } from '../pages/ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

function DarkMode() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 rounded-full font-medium text-sm transition duration-300 ease-in-out flex items-center justify-center ${
        isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-800'
      } hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isDarkMode ? 'focus:ring-yellow-400' : 'focus:ring-gray-800'
      }`}
    >
      {isDarkMode ? (
        <>
          <SunIcon className="w-5 h-5 mr-2" />
          Light Mode
        </>
      ) : (
        <>
          <MoonIcon className="w-5 h-5 mr-2" />
          Dark Mode
        </>
      )}
    </button>
  );
}

export default DarkMode;
